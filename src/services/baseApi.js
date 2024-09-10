// baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1', // Replace with API URL
    headers: (token) => ({
      Authorization: `Bearer ${token}`, // Add authorization header
    }),
    credentials: 'include', // Include cookies in requests
  }),
  tagTypes: ['Users', 'Admins', 'Teachers', 'Students'], // Add all possible tag types here
  endpoints: () => ({}), // We’ll extend this in other API slices
});
