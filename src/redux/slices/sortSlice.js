import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortField: "price",  // начальное значение
};

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortField(state, action) {
            state.sortField = action.payload;
        },
    },
});

export const { setSortField } = sortSlice.actions;
export default sortSlice.reducer;