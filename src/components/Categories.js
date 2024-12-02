import React, { useState } from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onClickCat = (index) => {
        setActiveIndex(index)
    }

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];


    return (
        <div class="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => onClickCat(index)} className={activeIndex === index ? 'active' : ''}>
                        {category}
                    </li>
                ))
                }


            </ul>
        </div >
    )
}

export default Categories