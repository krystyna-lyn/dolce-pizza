import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    categoryId: number;
    sortField: string;
}

const initialState: CategoryState = {
    categoryId: 0,
    sortField: "price",
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload // Update the category ID based on the provided value
        },
        setSortField(state, action: PayloadAction<string>) {
            state.sortField = action.payload;
        },

    },
})

export const selectSort = (state: { category: CategoryState }) => state.category.sortField;
export const selectCategoryId = (state: { category: CategoryState }) => state.category.categoryId


export const { setCategoryId, setSortField } = categorySlice.actions


export default categorySlice.reducer