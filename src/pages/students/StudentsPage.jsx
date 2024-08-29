import { useState } from 'react';
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../services/usersApi';
import UserForm from '../../components/common/UserForm';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  TableHead,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function StudentsPage() {
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useFetchUsersQuery();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuStudentId, setMenuStudentId] = useState(null);

  const users = userData?.data || [];

  // Filter users by role "student" and sort by ID
  const studentUsers = users
    .filter((user) => user.role === 'student')
    .sort((a, b) => a.user_id - b.user_id);

  const handleFormChange = (field, value) => {
    setSelectedStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const formattedStudent = {
      ...selectedStudent.User,
      role: selectedStudent.User.role.toLowerCase(),
    };

    if (isEditing) {
      try {
        await updateUser({
          id: selectedStudent.user_id,
          ...formattedStudent,
        }).unwrap();
        setIsEditing(false);
        setSelectedStudent(null);
      } catch (err) {
        console.error('Failed to update student:', err);
        alert('Error updating student. Please check the required fields.');
      }
    } else {
      try {
        await createUser(formattedStudent).unwrap();
        setSelectedStudent(null);
      } catch (err) {
        console.error('Failed to create student:', err);
        alert('Error creating student. Please check the required fields.');
      }
    }
  };

  const handleEditStudent = (user) => {
    setSelectedStudent({
      ...user,
      User: {
        ...user,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      },
    });
    setIsEditing(true);
  };

  const handleDeleteStudent = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      setAnchorEl(null);
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuStudentId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (isUserLoading) return <CircularProgress />;
  if (userError) {
    console.error('Error fetching users:', userError);
    return (
      <div>Error: {userError.data?.message || 'An unknown error occurred'}</div>
    );
  }

  return (
    <div className="app-component">
      <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
      {selectedStudent && (
        <UserForm
          user={selectedStudent}
          isEditing={isEditing}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      )}

      <h1>Students Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentUsers.length > 0 ? (
              studentUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="student-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, user.user_id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="student-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuStudentId === user.user_id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEditStudent(user)}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeleteStudent(user.user_id)}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No students available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentsPage;
