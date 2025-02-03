import { configureStore } from '@reduxjs/toolkit'
import category from '../redux/slices/categorySlice'
import searchReducer from '../redux/slices/searchSlice'
import sort from '../redux/slices/sortSlice'

export const store = configureStore({
    reducer: {
        category,
        search: searchReducer,
        sort: sort,
    },
});

export default store;