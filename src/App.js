import Header from './components/Header';
import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Cart from './components/pages/Cart';
import { useState } from 'react';


function App() {
  const [searchValue, setSearchValue] = useState('');

  console.log(searchValue)
  return (
    <div className="App">
      <div class="wrapper">

        <Router>
          <Header searchValue={searchValue} setSearchValue={setSearchValue} />

          <Routes>
            <Route path='/' element={<Home searchValue={searchValue} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Router>

      </div>

    </div>


  )
}


export default App;
