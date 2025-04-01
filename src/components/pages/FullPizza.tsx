import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";


interface Pizza {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

const FullPizza: React.FC = () => {

    const [pizza, setPizza] = useState<Pizza | null>(null);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPizza = async () => {
            if (!id) {
                navigate('/');
                return;
            }

            try {
                const pizzaDoc = await getDoc(doc(db, "pizza", id));
                if (pizzaDoc.exists()) {
                    const pizzaData = pizzaDoc.data() as Omit<Pizza, 'id'>; // Указываем, что это объект типа `Pizza` без id
                    setPizza({ id: pizzaDoc.id, ...pizzaData }); // Добавляем id вручную
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error fetching pizza:", error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPizza();
    }, [id, navigate]);

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
    );
};

export default FullPizza;

