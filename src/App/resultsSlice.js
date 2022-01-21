import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
};

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        add: (state, action) => {
            state.data[action.payload.resultType] = action.payload.data;
        },
        set: (state, action) => {
            state.data = {
                [action.payload.resultType]: action.payload.data
            };
        }
    }
})


export const selectResults = (state) => state.results.data;

export const { add, set } = resultsSlice.actions;

export default resultsSlice.reducer;
