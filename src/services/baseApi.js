// baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.seangdev.site/api/v1',
  }),
  tagTypes: ['Users', 'Admins', 'Teachers', 'Students'], // Add all possible tag types here
  endpoints: () => ({}), // We’ll extend this in other API slices
});
