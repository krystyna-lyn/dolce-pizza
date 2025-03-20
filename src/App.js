import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Cart from './components/pages/Cart';
import { createContext, useState } from 'react';
import FullPizza from './components/pages/FullPizza';
import MainLoyout from './components/layouts/MainLoyout';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
    </SearchContext.Provider>

  )
}


export default App;
