import React from 'react';
import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home.tsx';
import NotFound from './components/pages/NotFound';
import Cart from './components/pages/Cart';
import FullPizza from './components/pages/FullPizza.tsx';
import MainLoyout from './components/layouts/MainLoyout.tsx';


function App() {
  return (

    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<MainLoyout />}>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </Router>

    </div>


  )
}


export default App;
