const Categories = ({ categoryId, onClickCat }) => {

    const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'];

    console.log(categoryId)

    return (
        <div class="categories">
            <ul>
                {categories.map((category, index) => (

                    <li key={index}
                        onClick={() => onClickCat(index)}
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