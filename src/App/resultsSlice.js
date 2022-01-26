import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        documents: {},
        noDocuments: {}
    },
};

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        add: (state, action) => {
            state.data.documents[action.payload.resultType] = action.payload.data.documents;
            state.data.noDocuments[action.payload.resultType] = action.payload.data.noDocuments;
        },
        set: (state, action) => {
            state.data = {
                documents: {
                    [action.payload.resultType]: action.payload.data.documents
                },
                noDocuments: {
                    [action.payload.resultType]: action.payload.data.noDocuments
                }
            }
        }
    }
})


export const selectResults = (state) => state.results.data;

export const { add, set } = resultsSlice.actions;

export default resultsSlice.reducer;
