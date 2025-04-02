import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId } from "../redux/slices/categorySlice";
import React from "react";

type CategoriesProps = {
    setCategoryId: any
}

const Categories: React.FC<CategoriesProps> = ({ setCategoryId }) => {

    const dispatch = useDispatch()
    const categoryId = useSelector(selectCategoryId)

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

    //console.log(categoryId)

    return (
        <div className="categories">
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