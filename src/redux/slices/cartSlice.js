import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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
            console.log(state.items);

            // count totalPrice
            state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);

            state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);

            console.log("Current totalCount:", state.totalCount);
            console.log("Cart items:", state.items);
        },

        minusProduct(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type
            );

            if (findItem) {
                if (findItem.count > 1) {
                    findItem.count--;
                    state.totalCount--;
                } else {
                    state.items = state.items.filter(
                        (obj) => !(obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
                    );
                }
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },

        removeProduct(state, action) {
            const item = state.items.find((obj) => obj.id === action.payload);
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalCount -= item ? item.count : 0;
        },

        clearProducts: (state, action) => {
            state.items = [];
            state.totalCount = 0;
        },

    },
})

export const { addProduct, minusProduct, removeProduct, clearProducts } = cartSlice.actions


export default cartSlice.reducer