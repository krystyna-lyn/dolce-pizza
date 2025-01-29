import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../redux/slices/categorySlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
    },
});

export default store;