import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly using useNavigate
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../services/usersApi';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Button,
  CircularProgress,
  TableHead,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchFilter from '../../components/common/SearchFilter';
import UserForm from '../../components/common/UserForm';
import { capitalizeRole, lowercaseRole } from '../../utils/roleUtils';

function UsersPage() {
  const navigate = useNavigate(); // Correctly using navigate
  const { data, error, isLoading } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    subject: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);

  const users =
    data?.data.map((user) => ({
      ...user,
      role: capitalizeRole(user.role),
    })) || [];

    console.log(data)

  const filteredUsers = users
    .filter((user) => {
      return Object.keys(filters).every((key) =>
        user[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a.user_id === 1) return -1;
      if (b.user_id === 1) return 1;
      return a.user_id - b.user_id;
    });

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleChange = (field, value) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value });
    } else {
      setNewUser({ ...newUser, [field]: value });
    }
  };

  const handleCreateOrUpdateUser = async () => {
    try {
      const userToSubmit = editingUser || newUser;

      const validRoles = ['Admin', 'Teacher', 'Student', 'Parent'];
      if (!validRoles.includes(userToSubmit.role)) {
        alert('Invalid role selected');
        return;
      }

      const apiUser = {
        ...userToSubmit,
        role: lowercaseRole(userToSubmit.role),
      };

      if (apiUser.role !== 'teacher') {
        delete apiUser.subject;
      }

      if (editingUser) {
        await updateUser(apiUser).unwrap();
        setEditingUser(null);
      } else {
        await createUser(apiUser).unwrap();
        setNewUser({
          name: '',
          email: '',
          role: '',
          password: '',
          subject: '',
        });
      }
    } catch (err) {
      console.error('Failed to submit user:', err);
      alert(`Error submitting user: ${err.data?.message || err.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div className="app-component">
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <UserForm
        user={editingUser || newUser}
        isEditing={!!editingUser}
        onChange={handleChange}
        onSubmit={handleCreateOrUpdateUser}
      />

      <h1>Users Management</h1>

      <SearchFilter filters={filters} onFilterChange={handleFilterChange} />

      {error && (
        <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell
                    onClick={() => navigate(`/users/${user.user_id}`)} // Corrected string interpolation
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, user.user_id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={menuUserId === user.user_id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => setEditingUser(user)}>
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteUser(user.user_id);
                          handleMenuClose();
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersPage;
