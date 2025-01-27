const Categories = ({ value, onClickCat }) => {

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

    //console.log(value)

    return (
        <div class="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index}
                        onClick={() => onClickCat(index)}
                        className={value === index ? 'active' : ''}>
                        {category}
                    </li>
                ))
                }

            </ul>
        </div >
    )
}

export default Categories