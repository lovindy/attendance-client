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

function AdminsPage() {
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useFetchUsersQuery();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAdminId, setMenuAdminId] = useState(null);

  const users = userData?.data || [];

  // Filter users by role "admin" and sort by ID
  const adminUsers = users
    .filter((user) => user.role === 'admin')
    .sort((a, b) => a.user_id - b.user_id);

  const handleFormChange = (field, value) => {
    setSelectedAdmin((prevAdmin) => ({
      ...prevAdmin,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const formattedAdmin = {
      ...selectedAdmin.User,
      role: selectedAdmin.User.role.toLowerCase(),
    };

    if (isEditing) {
      try {
        await updateUser({
          id: selectedAdmin.user_id,
          ...formattedAdmin,
        }).unwrap();
        setIsEditing(false);
        setSelectedAdmin(null);
      } catch (err) {
        console.error('Failed to update admin:', err);
        alert('Error updating admin. Please check the required fields.');
      }
    } else {
      try {
        await createUser(formattedAdmin).unwrap();
        setSelectedAdmin(null);
      } catch (err) {
        console.error('Failed to create admin:', err);
        alert('Error creating admin. Please check the required fields.');
      }
    }
  };

  const handleEditAdmin = (user) => {
    setSelectedAdmin({
      ...user,
      User: {
        ...user,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      },
    });
    setIsEditing(true);
  };

  const handleDeleteAdmin = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      setAnchorEl(null);
    } catch (err) {
      console.error('Failed to delete admin:', err);
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuAdminId(userId);
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
      <h2>{isEditing ? 'Edit Admin' : 'Add Admin'}</h2>
      {selectedAdmin && (
        <UserForm
          user={selectedAdmin}
          isEditing={isEditing}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      )}

      <h1>Admins Management</h1>
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
            {adminUsers.length > 0 ? (
              adminUsers.map((user) => (
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
                      aria-controls="admin-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, user.user_id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="admin-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuAdminId === user.user_id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEditAdmin(user)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteAdmin(user.user_id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No admins available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminsPage;
