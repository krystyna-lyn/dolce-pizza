import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection, query, orderBy, where, limit, startAfter } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import Pagination from '../Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/categorySlice';

const Home = () => {

    //const { searchValue } = useContext(SearchContext);
    const searchValue = useSelector((state) => state.search.searchValue);

    const [pizzaList, setpizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const sortField = useSelector((state) => state.sort.sortField);

    const [sortOrder, setSortOrder] = useState("asc"); // Sort direction: 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1)// Current page starts at 1
    const [totalPizzas, setTotalPizzas] = useState(0); // To store the total number of pizzas

    // categoriId from Redux
    const categoryId = useSelector((state) => state.category.categoryId);
    const dispatch = useDispatch();

    const pizzasPerPage = 4; // Number of pizzas per page
    const pizzaCollectionRef = collection(db, "pizza");


    const getTotalPizzas = async () => {
        const data = await getDocs(pizzaCollectionRef);
        setTotalPizzas(data.size);  //total items in the collection
    };

    const lastDocRef = useRef(null); // last document(item)

    const getPizzaList = async () => {
        try {
            setIsLoading(true);

            let q;

            // 🔎 Если есть поисковый запрос — загружаем ВСЕ пиццы
            if (searchValue) {
                q = query(
                    pizzaCollectionRef,
                    orderBy("name", "asc") // Поиск работает лучше по алфавиту
                );
            } else {
                // 🔹 Обычная загрузка с пагинацией и сортировкой
                q = query(
                    pizzaCollectionRef,
                    orderBy(sortField, sortOrder),
                    limit(pizzasPerPage)
                );

                if (categoryId > 0) {
                    q = query(
                        pizzaCollectionRef,
                        where("category", "==", categoryId),
                        orderBy(sortField, sortOrder),
                        limit(pizzasPerPage)
                    );
                }

                if (currentPage > 1 && lastDocRef.current) {
                    q = query(
                        pizzaCollectionRef,
                        orderBy(sortField, sortOrder),
                        startAfter(lastDocRef.current),
                        limit(pizzasPerPage)
                    );
                }
            }

            // Загружаем данные
            const data = await getDocs(q);
            lastDocRef.current = data.docs[data.docs.length - 1];

            let pizzas = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            // 🔍 Фильтрация по поиску (если searchValue есть)
            if (searchValue) {
                pizzas = pizzas.filter((pizza) =>
                    pizza.name.toLowerCase().includes(searchValue.toLowerCase().trim())
                );
            }

            setpizzaList(pizzas); // Обновляем список пицц
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTotalPizzas(); // Fetch total pizzas on initial load
    }, []);

    useEffect(() => {
        // console.log("current page:", currentPage);
        // console.log("sort:", sortField, sortOrder);
        // console.log("category:", categoryId);
        console.log(searchValue)

        getPizzaList();
        window.scrollTo(0, 0);
    }, [categoryId, sortField, sortOrder, currentPage, searchValue]);

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

                    <Categories setCategoryId={(id) => dispatch(setCategoryId(id))} />
                    <Sort />

                </div>
                <h2 className="content__title">All Pizzas</h2>
                <div className="content__items">
                    {isLoading ? skeleton : pizzas}
                </div>
            </div>
            <Pagination
                onChangePage={(number) => setCurrentPage(number)}
                pageCount={Math.ceil(totalPizzas / pizzasPerPage)}
            />
        </div>
    );
};


export default Home