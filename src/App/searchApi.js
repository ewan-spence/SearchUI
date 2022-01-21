import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44306/api/Search' }),
    endpoints: (builder) => ({
        search: builder.query({
            query: (searchTerm) => `?search=${searchTerm}`
        })
    })
})

export const { useLazySearchQuery } = searchApi;