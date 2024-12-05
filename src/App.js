import Header from './components/Header';
import './scss/app.scss';
import { db } from "./firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';


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

        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home
              items={pizzaList}
              exact
            />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </Router>

      </div>

    </div>


  )
}


export default App;
