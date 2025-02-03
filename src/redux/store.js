import { configureStore } from '@reduxjs/toolkit'
import category from '../redux/slices/categorySlice'
import search from '../redux/slices/searchSlice'
import sort from '../redux/slices/sortSlice'

export const store = configureStore({
    reducer: {
        category,
        search,
        sort,
    },
});

export default store;