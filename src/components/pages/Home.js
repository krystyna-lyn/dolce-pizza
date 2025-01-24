import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection, query, orderBy, where, limit, startAt, endAt, startAfter } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import Pagination from '../Pagination';


const Home = ({ searchValue }) => {

    const [pizzaList, setpizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortField, setSortField] = useState("price");
    const [categoryId, setCategoryId] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc"); // Sort direction: 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1)// Current page starts at 1
    const [totalPizzas, setTotalPizzas] = useState(0); // To store the total number of pizzas

    const pizzasPerPage = 4; // Number of pizzas per page
    const pizzaCollectionRef = collection(db, "pizza");
    const pageCount = Math.ceil(totalPizzas / pizzasPerPage);
    const getTotalPizzas = async () => {
        const data = await getDocs(pizzaCollectionRef);
        setTotalPizzas(data.size); // Firestore's size property gives the total documents in the collection
    };

    const lastDocRef = useRef(null); // Последний документ для пагинации

    const getPizzaList = async () => {
        try {
            setIsLoading(true);

            // Стандартный запрос
            let q = query(
                pizzaCollectionRef,
                orderBy(sortField, sortOrder), // Сортировка
                limit(pizzasPerPage)          // Количество пицц за раз
            );

            // Если текущая страница больше 1, начинаем с последнего документа
            if (currentPage > 1 && lastDocRef.current) {
                q = query(
                    pizzaCollectionRef,
                    orderBy(sortField, sortOrder),
                    startAfter(lastDocRef.current), // Переход к следующей странице
                    limit(pizzasPerPage)
                );
            }

            // Получаем данные
            const data = await getDocs(q);

            // Сохраняем последний документ
            lastDocRef.current = data.docs[data.docs.length - 1];

            // Преобразуем документы в массив объектов
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setpizzaList(filteredData); // Сохраняем пиццы в состояние
            setIsLoading(false);
            console.log("Запрос к Firestore:", q);
        } catch (err) {
            console.error("Ошибка загрузки пицц:", err);
        }
    };



    useEffect(() => {
        getTotalPizzas(); // Fetch total pizzas on initial load
    }, []);

    useEffect(() => {
        console.log("Текущая страница:", currentPage);
        console.log("Сортировка:", sortField, sortOrder);
        console.log("Категория:", categoryId);
        getPizzaList();
        window.scrollTo(0, 0);
    }, [categoryId, sortField, sortOrder, currentPage]);

    const skeleton = [...Array(8)].map((_, index) => <Skeleton key={index} />);
    const pizzas = pizzaList.filter(
        obj => {
            if (obj.name.
                toLowerCase().
                includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((obj) => (<PizzaBlock
            key={obj.id}
            title={obj.name}
            image={obj.image}
            price={obj.price}
            sizes={obj.sizes}
            types={obj.types}
        />))

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">

                    <button class="sort-button" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        Sort {sortOrder === "asc" ? "↑" : "↓"}
                    </button>

                    <Categories value={categoryId} onClickCat={(i) => setCategoryId(i)} />
                    <Sort setSortField={setSortField} />
                </div>
                <h2 className="content__title">All Pizzas</h2>
                <div className="content__items">
                    {isLoading ? skeleton : pizzas}
                </div>
            </div>
            <Pagination
                onChangePage={(number) => setCurrentPage(number)}
                pageCount={Math.ceil(totalPizzas / pizzasPerPage)} // Считаем количество страниц
            />
        </div>
    );
};


export default Home