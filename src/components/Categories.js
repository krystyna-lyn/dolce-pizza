import React, { useState } from 'react';

const Categories = ({ value }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];
    const sortKeys = ['category']; // corresponding keys for sorting

    console.log(value)
    const onClickCat = (index) => {
        setActiveIndex(index)
    }


    return (
        <div class="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index}
                        onClick={() => onClickCat(index)}
                        className={activeIndex === index ? 'active' : ''}>
                        {category}
                    </li>
                ))
                }

            </ul>
        </div >
    )
}

export default Categories