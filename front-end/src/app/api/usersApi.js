import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'utils/api';

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ ...data }) => ({
                url: `/api/users/register`,
                method: 'POST',
                body: data
            }),
        }),
        login: builder.mutation({
            query: ({ ...data }) => ({
                url: `/api/users/login`,
                method: 'POST',
                body: data
            }),
        }),
        updateUserProfile: builder.mutation({
            query: ({ ...data }) => ({
                url: `/api/users/profile`,
                method: 'POST',
                body: data
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation, useUpdateUserProfileMutation } = usersApi