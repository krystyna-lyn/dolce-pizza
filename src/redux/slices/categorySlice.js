import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload // Update the category ID based on the provided value
        },
    },
})

export const { setCategoryId } = categorySlice.actions
export default categorySlice.reducer