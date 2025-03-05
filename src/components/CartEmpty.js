import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => (
    <div className="cart cart--empty">
        <h2>
            Empty cart <span>😕</span>
        </h2>
        <p>
            Your cart is empty
            <br />
            Go back to the store and pick some items
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
            <span>Go back</span>
        </Link>
    </div>
);