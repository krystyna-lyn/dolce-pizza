import Categories from '../Categories';
import Sort from '../Sort';
import { Skeleton } from '../Skeleton';
import PizzaBlock from '../PizzaBlock';

import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';


const Home = () => {

    const [pizzaList, setpizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const pizzaCollectionRef = collection(db, "pizza");

    const getPizzaList = async () => {
        try {
            const data = await getDocs(pizzaCollectionRef);

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
    }, []);


    return (
        <div class="content">
            <div class="container">
                <div class="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 class="content__title">All Pizzas</h2>
                <div class="content__items">
                    {isLoading ? [...Array(3)].map(() => <Skeleton />) : pizzaList.map((obj) => (
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