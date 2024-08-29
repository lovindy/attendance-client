import { baseApi } from './baseApi';

export const schoolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSchools: builder.query({
      query: () => '/schools',
      providesTags: ['Schools'],
    }),
    // Create a new school
    createSchool: builder.mutation({
      query: (school) => ({
        url: '/schools',
        method: 'POST',
        body: school,
      }),
    }),
    // Fetch a single school by id
    fetchSchool: builder.query({
      query: (schoolId) => `/schools/${schoolId}`,
      providesTags: ['Schools'],
    }),
    // Update a school by id
    updateSchool: builder.mutation({
      query: ({ schoolId, schoolData }) => ({
        url: `/schools/${schoolId}`,
        method: 'PUT',
        body: schoolData,
      }),
    }),
    // Delete a school by id
    deleteSchool: builder.mutation({
      query: (schoolId) => ({
        url: `/schools/${schoolId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false, // If you want to prevent overwriting existing endpoints globally
});

export const {
  useFetchSchoolsQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApi;
