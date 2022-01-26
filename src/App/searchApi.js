import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44306/api/search' }),
    endpoints: (builder) => ({
        search: builder.mutation({
            query: ({ ...body }) => ({
                url: '',
                method: 'POST',
                body: body
            })
        }),
        getFilters: builder.query({
            query: () => '/filters'
        })
    })
})

export const {
    useSearchMutation,
    useGetFiltersQuery } = searchApi;