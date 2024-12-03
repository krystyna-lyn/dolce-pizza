import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';
import { pizzas } from './assets/pizzas';
import Sort from './components/Sort';
import { db } from "./firebaseConfig";
import {
  getDocs,
  collection
} from "firebase/firestore";
import { useEffect, useState } from 'react';

function App() {

  const [pizzaList, setpizzaList] = useState([]);

  const pizzaCollectionRef = collection(db, "pizza");

  const getPizzaList = async () => {
    try {
      const data = await getDocs(pizzaCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setpizzaList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPizzaList();
  }, []);


  return (
    <div className="App">

      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />

            </div>
            <h2 class="content__title">All Pizzas</h2>
            <div>
              {pizzaList.map((item, id) => (
                <h1>{item.name}</h1>
              ))
              }
            </div>
            <div class="content__items">
              {pizzas.map((obj) => (
                <PizzaBlock title={obj.name} price={obj.price} sizes={obj.sizes} types={obj.types} />
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default App;
