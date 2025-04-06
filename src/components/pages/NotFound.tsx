import React from 'react'
import NotFoundBlock from '../NotFoundBlock'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <div>
            <NotFoundBlock />
            <button className='button button--notfound'>
                <Link to="/">Go Home</Link>
            </button>
        </div>
    )
}

export default NotFound