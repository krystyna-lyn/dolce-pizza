import { configureStore } from '@reduxjs/toolkit'
import category from './slices/categorySlice'
import search from './slices/searchSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        category,
        search,
        cart
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;