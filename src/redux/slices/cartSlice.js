import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /*  addProduct: (state, action) => {
             state.items.push(action.payload) // add product
             state.totalPrice = state.items.reduce((sum, obj) => {
                 return obj.price + sum
             }, 0)
         }, */

        addProduct: (state, action) => {
            console.log("Добавляем пиццу:", action.payload);
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
            );

            if (findItem) {
                findItem.count++; // Увеличиваем количество этой же пиццы
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            console.log("Корзина после добавления:", state.items);

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            console.log("Общая сумма после добавления:", state.totalPrice);
        },

        removeProduct(state, action) {
            state.items = state.items.filter((obj) => obj.id != action.payload)
        },

        clearProducts: (state, action) => {
            state.items = [] //
        },

    },
})

export const { addProduct, removeProduct, clearProducts } = cartSlice.actions


export default cartSlice.reducer