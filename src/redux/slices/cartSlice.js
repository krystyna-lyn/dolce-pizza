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
            console.log("Add pizza:", action.payload);
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
            );

            if (findItem) {
                findItem.count++; //add quantity
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

        minusProduct(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem && findItem.count > 1) {  // Проверяем, чтобы количество не стало меньше 1
                findItem.count--;
            }
        },

        removeProduct(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },

        clearProducts: (state, action) => {
            state.items = [] //
        },

    },
})

export const { addProduct, minusProduct, removeProduct, clearProducts } = cartSlice.actions


export default cartSlice.reducer