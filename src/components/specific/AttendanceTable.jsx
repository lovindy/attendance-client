import React from 'react';

const AttendanceTable = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return <p>No attendance records found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Student ID</th>
          <th>Teacher ID</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((record) => (
          <tr key={record.attendance_id}>
            <td>{record.date}</td>
            <td>{record.studentId}</td>
            <td>{record.teacherId}</td>
            <td>{record.present ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
