import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        add: (state, action) => {
            state[action.payload.resultType] = action.payload.data;
        },
        set: (state, action) => {
            state = action.payload.data;
        }
    }
})


export const selectResults = (state) => state.results;

export const { add, set } = resultsSlice.actions;

const resultsReducer = resultsSlice.reducer;
export default resultsReducer;