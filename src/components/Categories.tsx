import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId, setCategoryId } from "../redux/slices/categorySlice";
import React from "react";
import { AppDispatch } from "../redux/store";


const Categories: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
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