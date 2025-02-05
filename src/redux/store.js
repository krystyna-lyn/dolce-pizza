import { configureStore } from '@reduxjs/toolkit'
import category from '../redux/slices/categorySlice'
import search from '../redux/slices/searchSlice'

export const store = configureStore({
    reducer: {
        category,
        search,
    },
});

export default store;