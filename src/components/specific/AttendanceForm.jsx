// Libraries
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Slices
import createAttendanceRecord from '../../features/attendance/attendanceSlice';

// Selectors
import {
  selectAttendanceError,
  selectAttendanceLoading,
} from '../../features/attendance/attendanceSelectors';

// MUI
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

const AttendanceForm = () => {
  const [date, setDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [present, setPresent] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(selectAttendanceLoading);
  const error = useSelector(selectAttendanceError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = {
      date,
      studentId,
      teacherId,
      present,
    };

    try {
      await dispatch(createAttendanceRecord(newAttendance));
      setDate('');
      setStudentId('');
      setTeacherId('');
      setPresent(false);
    } catch (error) {
      console.error('Failed to create attendance:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}
    >
      {error && <Typography color="error">Error: {error}</Typography>}
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Student ID"
        type="number"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Teacher ID"
        type="number"
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={present}
            onChange={(e) => setPresent(e.target.checked)}
          />
        }
        label="Present"
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Attendance'}
      </Button>
    </Box>
  );
};

export default AttendanceForm;
