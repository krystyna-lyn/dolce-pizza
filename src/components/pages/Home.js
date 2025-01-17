import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from 'react';


const Home = () => {

    const [pizzaList, setpizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortField, setSortField] = useState("price")
    const [category, setCategory] = useState(555)


    const pizzaCollectionRef = collection(db, "pizza");

    const getPizzaList = async () => {
        try {
            // Create a query with sorting
            const q = query(pizzaCollectionRef, orderBy(sortField, 'asc'));
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
        window.scrollTo(0, 0)
    }, [sortField]);


    return (
        <div class="content">
            <div class="container">
                <div class="content__top">
                    <Categories value={category} />
                    <Sort setSortField={setSortField} />
                </div>
                <h2 class="content__title">All Pizzas</h2>
                <div class="content__items">
                    {isLoading ? [...Array(4)].map(() => <Skeleton />) : pizzaList.map((obj) => (
                        <PizzaBlock
                            title={obj.name}
                            image={obj.image}
                            price={obj.price}
                            sizes={obj.sizes}
                            types={obj.types}
                            loading={isLoading} />
                    ))
                    }
                </div>
            </div>
        </div>


    )
}

export default Home