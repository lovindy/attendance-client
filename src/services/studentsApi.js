import { baseApi } from './baseApi';

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Student
    fetchStudents: builder.query({
      query: () => '/students',
      providesTags: ['Students'],
    }),
    // Create a new student
    createStudent: builder.mutation({
      query: (student) => ({
        url: '/students',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),
    // Update a student
    updateStudent: builder.mutation({
      query: (student) => ({
        url: `/students/${student.student_id}`,
        method: 'PUT',
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),
    // Delete a student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const {
  useFetchStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
