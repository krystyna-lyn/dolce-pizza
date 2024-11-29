import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';
import { pizzas } from './assets/pizzas';
import Sort from './components/Sort';

function App() {
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
