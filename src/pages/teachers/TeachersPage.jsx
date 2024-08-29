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

function TeachersPage() {
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useFetchUsersQuery();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTeacherId, setMenuTeacherId] = useState(null);

  const users = userData?.data || [];

  // Filter users by role "teacher" and sort by ID
  const teacherUsers = users
    .filter((user) => user.role === 'teacher')
    .sort((a, b) => a.user_id - b.user_id);

  const handleFormChange = (field, value) => {
    setSelectedTeacher((prevTeacher) => ({
      ...prevTeacher,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const formattedTeacher = {
      ...selectedTeacher.User,
      role: selectedTeacher.User.role.toLowerCase(),
    };

    if (isEditing) {
      try {
        await updateUser({
          id: selectedTeacher.user_id,
          ...formattedTeacher,
        }).unwrap();
        setIsEditing(false);
        setSelectedTeacher(null);
      } catch (err) {
        console.error('Failed to update teacher:', err);
        alert('Error updating teacher. Please check the required fields.');
      }
    } else {
      try {
        await createUser(formattedTeacher).unwrap();
        setSelectedTeacher(null);
      } catch (err) {
        console.error('Failed to create teacher:', err);
        alert('Error creating teacher. Please check the required fields.');
      }
    }
  };

  const handleEditTeacher = (user) => {
    setSelectedTeacher({
      ...user,
      User: {
        ...user,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      },
    });
    setIsEditing(true);
  };

  const handleDeleteTeacher = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      setAnchorEl(null);
    } catch (err) {
      console.error('Failed to delete teacher:', err);
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuTeacherId(userId);
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
      <h2>{isEditing ? 'Edit Teacher' : 'Add Teacher'}</h2>
      {selectedTeacher && (
        <UserForm
          user={selectedTeacher}
          isEditing={isEditing}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      )}

      <h1>Teachers Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacherUsers.length > 0 ? (
              teacherUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>{user.subject || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="teacher-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, user.user_id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="teacher-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuTeacherId === user.user_id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEditTeacher(user)}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeleteTeacher(user.user_id)}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No teachers available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TeachersPage;
