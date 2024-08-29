import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  useFetchAttendanceByStudentsQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} from '../../services/attandanceApi';

function AttendancePage() {
  const { data, error, isLoading } = useFetchAttendanceByStudentsQuery();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [deleteAttendance] = useDeleteAttendanceMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (data) {
      setAttendanceData(data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = async (attendance, newStatus) => {
    try {
      const updatedAttendance = {
        ...attendance,
        status: newStatus,
      };

      await updateAttendance(updatedAttendance).unwrap();

      setAttendanceData((prevData) =>
        prevData.map((student) => ({
          ...student,
          Attendances: student.Attendances.map((att) =>
            att.attendance_id === attendance.attendance_id
              ? updatedAttendance
              : att
          ),
        }))
      );
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendance(id).unwrap();
      setAttendanceData((prevData) =>
        prevData.map((student) => ({
          ...student,
          Attendances: student.Attendances.filter(
            (att) => att.attendance_id !== id
          ),
        }))
      );
    } catch (err) {
      console.error('Failed to delete attendance:', err);
    }
  };

  const filteredData = attendanceData?.filter((student) =>
    student.student_id.toString().includes(searchQuery)
  );

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching attendance:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

  return (
    <div className="app-component">
      <h1>Search Student</h1>
      <TextField
        label="Search by Student ID"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <h1>Attendance List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((student) =>
              student.Attendances.length > 0 ? (
                student.Attendances.map((attendance) => (
                  <TableRow key={attendance.attendance_id}>
                    <TableCell>{student.student_id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{attendance.Class?.name || 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(attendance.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={attendance.status}
                        onChange={(e) =>
                          handleStatusChange(attendance, e.target.value)
                        }
                      >
                        <MenuItem value="late">Late</MenuItem>
                        <MenuItem value="present">Present</MenuItem>
                        <MenuItem value="absent">Absent</MenuItem>
                        <MenuItem value="absent_with_permission">
                          Permission
                        </MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(attendance.attendance_id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell colSpan={5}>No Attendance Records</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttendancePage;
