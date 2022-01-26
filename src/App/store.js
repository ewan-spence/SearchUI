import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./resultsSlice";
import searchReducer from "./searchSlice";

import { searchApi } from "./searchApi";

export const store = configureStore({
    reducer: {
        [searchApi.reducerPath]: searchApi.reducer,
        results: resultsReducer,
        search: searchReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(searchApi.middleware)
});