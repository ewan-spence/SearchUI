import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    savedSearches: []
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchTerm: (state, action) => {
            state.data[action.payload.resultType] = action.payload.data;
        },
        addSavedSearches: (state, action) => {
            state.savedSearches = action.payload.data
        }
    }
})


export const selectSearch = (state) => state.search.data;
export const selectSavedSearches = (state) => state.search.savedSearches;
export const { addSearchTerm, addSavedSearches } = searchSlice.actions;

export default searchSlice.reducer;
