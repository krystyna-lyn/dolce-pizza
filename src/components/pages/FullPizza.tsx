import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const FullPizza: React.FC = () => {

    const [pizza, setPizza] = useState<{
        id: string,
        name: string,
        price: number,
        image: string,
        description: string,
    }>();

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    //	useEffect() запускает код при рендере компонента и каждый раз, когда меняется id.

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                if (!id) {
                    navigate('/');
                    return;
                }
                const pizzaDoc = await getDoc(doc(db, "pizza", id));

                if (pizzaDoc.exists()) {
                    setPizza({ id: pizzaDoc.id, ...pizzaDoc.data() });
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

    return (
        <div className="container">
            <img src={pizza?.image} alt={pizza?.name} />
            <h1>{pizza?.name}</h1>
            <p>{pizza?.description || "No description available."}</p>
            <h4>{pizza?.price} €</h4>
        </div>
    )
}

export default FullPizza