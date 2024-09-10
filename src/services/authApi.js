import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup
    signup: builder.mutation({
      query: (user) => ({
        url: 'users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: user,
      }),
    }),

    // Refresh the JWT token
    logout: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'users/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `users/resetPassword/${token}`, // Updated URL to match the backend route
        method: 'PATCH',
        body: {
          password: newPassword, // Sending new password
          passwordConfirm: newPassword, // Temporary field for validation
        },
      }),
    }),

    // Update password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: 'users/updatePassword',
        method: 'PATCH',
        body: data,
      }),
    }),

    // Check the user authorization
    checkAuth: builder.query({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
