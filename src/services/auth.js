import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: '/users/signup', // Update this to match your backend route
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/users/login', // Update this to match your backend route
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
