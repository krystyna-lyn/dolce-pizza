import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortField: "price",
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload // Update the category ID based on the provided value
        },
        setSortField(state, action) {
            state.sortField = action.payload;
        },
    },
})

export const { setCategoryId, setSortField } = categorySlice.actions


export default categorySlice.reducer