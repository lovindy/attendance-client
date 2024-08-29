// usersApi.js
// Importing the base API configuration from baseApi.js
import { baseApi } from './baseApi';

// Creating an API slice specifically for users using RTK Query's injectEndpoints method
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch users endpoint (GET request to /users)
    // This query fetches all users from the server
    fetchUsers: builder.query({
      query: () => '/users', // Specifies the endpoint to fetch users
      providesTags: ['Users'], // Tags the result with 'Users' for cache invalidation
    }),

    // Fetch user by ID endpoint (GET request to /users/:id)
    // This query fetches a specific user by ID from the server
    fetchUserById: builder.query({
      query: (id) => `/users/${id}`, // Specifies the endpoint to fetch a specific user by ID
      providesTags: (result, error, id) => [{ type: 'Users', id }], // Tag result for cache invalidation based on ID
    }),

    // Create user endpoint (POST request to /users)
    // This mutation sends a new user object to the server to create a user
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users', // Specifies the endpoint to create a user
        method: 'POST', // Indicates that this is a POST request
        body: user, // Sends the user data in the body of the request
      }),
      invalidatesTags: ['Users'], // Invalidates 'Users' cache, forcing refetch of users
    }),

    // Update user endpoint (PUT request to /users/:user_id)
    // This mutation sends an updated user object to the server to update an existing user
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.user_id}`, // Specifies the endpoint for updating a specific user
        method: 'PUT', // Indicates that this is a PUT request
        body: user, // Sends the updated user data in the body of the request
      }),
      invalidatesTags: (result, error, user) => [
        { type: 'Users', id: user.user_id },
      ], // Invalidates cache for updated user
    }),

    // Delete user endpoint (DELETE request to /users/:id)
    // This mutation sends a request to the server to delete a specific user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`, // Specifies the endpoint for deleting a specific user
        method: 'DELETE', // Indicates that this is a DELETE request
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }], // Invalidates cache for deleted user
    }),
  }),
  overrideExisting: false, // Ensures existing endpoints are not overridden
});

// Exporting hooks generated by RTK Query for usage in components
export const {
  useFetchUsersQuery, // Hook for fetching users
  useFetchUserByIdQuery, // Hook for fetching a specific user
  useCreateUserMutation, // Hook for creating a user
  useUpdateUserMutation, // Hook for updating a user
  useDeleteUserMutation, // Hook for deleting a user
} = usersApi;
