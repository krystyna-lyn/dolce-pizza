import Categories from '../Categories';
import Sort from '../Sort';

const Home = () => {

    return (
        <div class="content">
            <div class="container">
                <div class="content__top">
                    <Categories />
                    <Sort />

                </div>
                <h2 class="content__title">All Pizzas</h2>

            </div>
        </div>


    )
}

export default Home