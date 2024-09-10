// baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://44.198.191.149:8000/api/v1',
    headers: (token) => ({
      Authorization: `Bearer ${token}`,
    }),
    credentials: 'include',
  }),
  tagTypes: ['Users', 'Admins', 'Teachers', 'Students'], // Add all possible tag types here
  endpoints: () => ({}), // We’ll extend this in other API slices
});
