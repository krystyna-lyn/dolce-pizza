import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState } from 'react';


const Home = ({ searchValue }) => {

    const [pizzaList, setpizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortField, setSortField] = useState("price");
    const [categoryId, setCategoryId] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc"); // Sort direction: 'asc' or 'desc'

    const pizzaCollectionRef = collection(db, "pizza");

    const getPizzaList = async () => {
        try {
            setIsLoading(true);

            // Base query
            let q = query(pizzaCollectionRef, orderBy(sortField, sortOrder));

            // Add category filtering if a specific category is selected
            if (categoryId !== 0) {
                q = query(
                    pizzaCollectionRef,
                    orderBy(sortField, 'asc'),
                    where('category', '==', categoryId)
                );
            }
            console.log(categoryId)

            // Fetch data
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setIsLoading(false);
            setpizzaList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPizzaList();
        window.scrollTo(0, 0);
    }, [categoryId, sortField, sortOrder]);

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
        </div>
    );
};


export default Home