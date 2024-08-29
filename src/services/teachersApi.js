// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const teachersApi = createApi({
//   reducerPath: 'teachersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
//   tagTypes: ['Teachers'],
//   endpoints: (builder) => ({
//     // Fetch all teachers
//     fetchTeachers: builder.query({
//       query: () => '/teachers',
//       providesTags: ['Teachers'],
//     }),
//     // Create a new teacher
//     createTeacher: builder.mutation({
//       query: (teacher) => ({
//         url: '/teachers',
//         method: 'POST',
//         body: teacher,
//       }),
//       invalidatesTags: ['Teachers'],
//     }),
//     // Update an existing teacher
//     updateTeacher: builder.mutation({
//       query: (teacher) => ({
//         url: `/teachers/${teacher.teacher_id}`,
//         method: 'PUT',
//         body: teacher,
//       }),
//       invalidatesTags: ['Teachers'],
//     }),
//     // Delete a teacher record
//     deleteTeacher: builder.mutation({
//       query: (id) => ({
//         url: `/teachers/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Teachers'],
//     }),
//   }),
// });

// export const {
//   useFetchTeachersQuery,
//   useCreateTeacherMutation,
//   useUpdateTeacherMutation,
//   useDeleteTeacherMutation,
// } = teachersApi;

// // teachersApi.js
import { baseApi } from './baseApi';

export const teachersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTeachers: builder.query({
      query: () => '/teachers',
      providesTags: ['Teachers'],
    }),
    createTeacher: builder.mutation({
      query: (teacher) => ({
        url: '/teachers',
        method: 'POST',
        body: teacher,
      }),
      invalidatesTags: ['Teachers'],
    }),
    updateTeacher: builder.mutation({
      query: (teacher) => ({
        url: `/teachers/${teacher.teacher_id}`,
        method: 'PUT',
        body: teacher,
      }),
      invalidatesTags: ['Teachers'],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teachers'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi;
