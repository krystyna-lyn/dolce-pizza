import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSortField } from '../redux/slices/categorySlice';

type PopupClick = MouseEvent & {
    path: Node[];
};

const Sort = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected] = useState(0);

    const dispatch = useDispatch();
    const sortField = useSelector(selectSort);
    const sortRef = useRef(null);


    const list = ['Popular', 'Price', 'A-Z'];
    const sortKeys = ['popular', 'price', 'name']; // corresponding keys for sorting

    const currentIndex = sortKeys.indexOf(sortField); // index of sortfield
    const sortName = list[currentIndex]; // name of sortfield


    const selectItem = (index: number) => {
        dispatch(setSortField(sortKeys[index])); //send to redux
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClick;

            if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
                setIsOpen(false);
                console.log('click outside');
            }
        };
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            console.log('sort unmound')
            document.body.removeEventListener('click', handleClickOutside)
        }

    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setIsOpen(!isOpen)}>{sortName}</span>
            </div>
            {isOpen && (
                <div className='sort__popup'>
                    <ul>
                        {
                            list.map((name, index) => (
                                <li key={index}
                                    onClick={() => selectItem(index)}
                                    className={currentIndex === index ? 'active' : ''}
                                >
                                    {name}
                                </li>

                            ))
                        }

                    </ul>
                </div>
            )}
        </div>
    )
}

export default Sort