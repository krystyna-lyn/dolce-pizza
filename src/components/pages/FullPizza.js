import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const FullPizza = () => {

    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const pizzaDoc = await getDoc(doc(db, "pizza", id));

                if (pizzaDoc.exists()) {
                    setPizza({ id: pizzaDoc.id, ...pizzaDoc.data() });
                } else {
                    console.log("No such pizza!");
                }
            } catch (error) {
                console.error("Error fetching pizza:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPizza();
    }, [id]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (!pizza) {
        return <h2>Pizza not found</h2>;
    }


    return (
        <div className="container">
            <img src={pizza.image} alt={pizza.name} />
            <h1>{pizza.name}</h1>
            <p>{pizza.description || "No description available."}</p>
            <h4>{pizza.price} €</h4>
        </div>
    )
}

export default FullPizza