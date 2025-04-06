import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection, query, orderBy, where, limit, startAfter } from "firebase/firestore";
import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { selectCategoryId, selectSort, setCategoryId } from '../../redux/slices/categorySlice';
import { selectSearchValue } from '../../redux/slices/searchSlice';
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

interface Pizza {
    id: string;
    name: string;
    image: string;
    price: number;
    sizes: number[];
    types: number[];
    category: number;
}

const Home: React.FC = () => {

    const searchValue = useSelector(selectSearchValue);

    const [pizzaList, setpizzaList] = useState<Pizza[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("loading"); // 'loading','error', 'success'

    const sortField = useSelector(selectSort);

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sort direction: 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1)// Current page starts at 1
    const [totalPizzas, setTotalPizzas] = useState(0); // To store the total number of pizzas

    // categoriId from Redux
    const categoryId = useSelector(selectCategoryId);
    const dispatch = useDispatch();

    const pizzasPerPage = 4; // Number of pizzas per page
    const pizzaCollectionRef = collection(db, "pizza");


    const getTotalPizzas = async () => {
        const data = await getDocs(pizzaCollectionRef);
        setTotalPizzas(data.size);  //total items in the collection
    };

    // last document(item)
    const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);

    const getPizzaList = async () => {
        try {
            setIsLoading(true);
            setStatus("loading");
            let q;

            if (searchValue) {
                q = query(
                    pizzaCollectionRef,
                    orderBy("name", "asc")
                );
            } else {

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

            const data = await getDocs(q);
            lastDocRef.current = data.docs[data.docs.length - 1];

            let pizzas: Pizza[] = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as Pizza[];

            if (searchValue) {
                pizzas = pizzas.filter((pizza) =>
                    pizza.name.toLowerCase().includes(searchValue.toLowerCase().trim())
                );
            }

            setpizzaList(pizzas);
            setIsLoading(false);

            if (pizzas.length === 0) {
                setStatus("error");
            } else {
                setStatus("success");
            }

        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    useEffect(() => {
        getTotalPizzas(); // Fetch total pizzas on initial load
    }, []);

    useEffect(() => {
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
            id={obj.id}
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

                    <button className="sort-button" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        Sort {sortOrder === "asc" ? "↑" : "↓"}
                    </button>

                    <Categories />
                    <Sort />

                </div>
                <h2 className="content__title">All Pizzas</h2>
                {
                    status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Something went wrong 😢</h2>
                            <p>We couldn't find any pizzas. Please try again later.</p>
                        </div>
                    ) : (
                        <div className="content__items">
                            {isLoading ? skeleton : pizzas}
                        </div>
                    )
                }

            </div>
            <Pagination
                onChangePage={(number: number) => setCurrentPage(number)}
                pageCount={Math.ceil(totalPizzas / pizzasPerPage)}
            />
        </div>
    );
};

export default Home