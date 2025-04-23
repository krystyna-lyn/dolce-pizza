import { createSlice } from '@reduxjs/toolkit'

interface SearchState {
    searchValue: string;
}

const initialState = {
    searchValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload // Update the category ID based on the provided value
        },
    },
})
export const selectSearchValue = (state: { search: SearchState }) => state.search.searchValue;

export const { setSearchValue } = searchSlice.actions
export default searchSlice.reducer