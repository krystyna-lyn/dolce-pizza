import Header from './components/Header';
import './scss/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/pages/Auth';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';


function App() {


  return (
    <div className="App">
      <div class="wrapper">


        <Router>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path='/notfound' element={<NotFound />} />
          </Routes>

        </Router>

      </div>

    </div>


  )
}


export default App;
