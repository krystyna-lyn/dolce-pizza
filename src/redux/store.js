import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../redux/slices/categorySlice'
import searchReducer from '../redux/slices/searchSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        search: searchReducer,
    },
});

export default store;