import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44306/api/search' }),
    endpoints: (builder) => ({
        search: builder.mutation({
            // search: builder.query({
            query: ({ ...body }) => {
                console.log(body);
                return ({
                    url: '',
                    method: 'POST',
                    body
                })
            }
        }),
        getFilters: builder.query({
            query: () => '/filters'
        })
    })
})

export const {
    // useLazySearchQuery, 
    useSearchMutation,
    useGetFiltersQuery } = searchApi;