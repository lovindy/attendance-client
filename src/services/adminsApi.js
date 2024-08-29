import { baseApi } from './baseApi';

export const adminsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all admins
    fetchAdmins: builder.query({
      query: () => '/admins',
      providesTags: ['Admins'],
    }),
    // Create admin
    createAdmin: builder.mutation({
      query: (admin) => ({
        url: '/admins',
        method: 'POST',
        body: admin,
      }),
      invalidatesTags: ['Admins'],
    }),
    // Update admin
    updateAdmin: builder.mutation({
      query: (admin) => ({
        url: `/admins/${admin.admin_id}`,
        method: 'PUT',
        body: admin,
      }),
      invalidatesTags: ['Admins'],
    }),
    // Delete admin
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admins'],
    }),
  }),
});

export const {
  useFetchAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminsApi;
