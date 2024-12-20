import React from 'react'
import NotFoundBlock from '../NotFoundBlock'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <NotFoundBlock />
            <button>
                <Link to="/">Go Home</Link>
            </button>
        </div>
    )
}

export default NotFound