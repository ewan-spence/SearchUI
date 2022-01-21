import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./resultsSlice";

import { searchApi } from "./searchApi";

export const store = configureStore({
    reducer: {
        [searchApi.reducerPath]: searchApi.reducer,
        results: resultsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(searchApi.middleware)
});