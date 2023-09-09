import { API_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: () => ({}),
    tagTypes: ['Todos'],
});
