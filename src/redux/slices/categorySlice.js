import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sortField: "price",
    pageCount: 1,
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
        setPageCount(state, action) {
            state.pageCount = action.payload;
        },
    },
})

export const { setCategoryId, setSortField, setPageCount } = categorySlice.actions


export default categorySlice.reducer