import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchTerm: (state, action) => {
            state.data[action.payload.resultType] = action.payload.data;
        },
    }
})


export const selectSearch = (state) => state.search.data;

export const { addSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
