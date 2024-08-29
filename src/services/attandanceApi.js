import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch attendance records by _id
    fetchAttendanceByStudent: builder.query({
      query: (student_id) => `/attendance/students/${student_id}`, // Assuming you need to fetch by student ID
      providesTags: ['Attendance'],
    }),
    // Fetch attendance list
    fetchAttendanceByStudents: builder.query({
      query: () => '/attendance',
      providesTags: ['Attendance'],
    }),
    // Create attendance record
    createAttendance: builder.mutation({
      query: (attendance) => ({
        url: '/attendance',
        method: 'POST',
        body: attendance,
      }),
    }),
    // Update attendance record
    updateAttendance: builder.mutation({
      query: (attendance) => ({
        url: `/attendance/${attendance.attendance_id}`,
        method: 'PUT',
        body: attendance,
      }),
    }),
    // Delete attendance record
    deleteAttendance: builder.mutation({
      query: (attendance_id) => ({
        url: `/attendance/${attendance_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchAttendanceByStudentQuery,
  useFetchAttendanceByStudentsQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
