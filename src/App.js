import Header from './components/Header';
import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Cart from './components/pages/Cart';
import { createContext, useState } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');


  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="App">
        <div class="wrapper">

          <Router>
            <Header />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

          </Router>

        </div>

      </div>
    </SearchContext.Provider>

  )
}


export default App;
