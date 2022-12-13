import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'utils/api';

// Define a service using a base URL and expected endpoints
export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =   JSON.parse(localStorage.getItem("user"))?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['notes'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: `/api/notes`,
        method: "GET",
      }),
      // transformResponse: (response, meta, arg) => response?.user?.[0],
      providesTags: ['notes'],
    }),
    createNote: builder.mutation({
      query: ({id,...data}) => ({
        url: `/api/notes/create`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['notes'],
    }),
    getNoteById: builder.query({
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 1,
    }),
    updateNote: builder.mutation({
      query: ({id,...data}) => ({
        url: `/api/notes/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['notes'],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['notes'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotesQuery, useCreateNoteMutation, useUpdateNoteMutation,useGetNoteByIdQuery,
useDeleteNoteMutation
} = notesApi