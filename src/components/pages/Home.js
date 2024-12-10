import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock';

const Home = ({ items, isLoading }) => {

    return (
        <div class="content">
            <div class="container">
                <div class="content__top">
                    <Categories />
                    <Sort />

                </div>
                <h2 class="content__title">All Pizzas</h2>

                <div class="content__items">
                    {isLoading ? [...Array(3)] : items.map((obj) => (
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


            </div>
        </div>


    )
}

export default Home