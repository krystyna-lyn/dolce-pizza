import { configureStore } from '@reduxjs/toolkit'
import category from '../redux/slices/categorySlice'
import search from '../redux/slices/searchSlice'
import cart from '../redux/slices/cartSlice'

export const store = configureStore({
    reducer: {
        category,
        search,
        cart
    },
});

export default store;