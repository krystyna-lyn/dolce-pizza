import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/categorySlice";

const Categories = ({ setCategoryId }) => {

    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.category.categoryId)

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

    //console.log(categoryId)

    return (
        <div class="categories">
            <ul>
                {categories.map((category, index) => (

                    <li key={index}
                        onClick={() => dispatch(setCategoryId(index))}
                        className={categoryId === index ? 'active' : ''}>
                        {category}
                    </li>
                ))

                }

            </ul>
        </div >
    )
}

export default Categories