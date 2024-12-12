import Header from './components/Header';
import './scss/app.scss';
import { db } from "./firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';
import PizzaBlock from './components/PizzaBlock';
import { Skeleton } from './components/Skeleton';


function App() {

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
    <div className="App">
      <div class="wrapper">


        <Router>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
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
        </Router>

      </div>

    </div>


  )
}


export default App;
