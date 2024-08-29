import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const UserForm = ({ user, isEditing, onChange, onSubmit }) => {
  const roles = ['Admin', 'Teacher', 'Student', 'Parent'];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <TextField
        label="Name"
        value={user.name}
        onChange={(e) => onChange('name', e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={user.email}
        onChange={(e) => onChange('email', e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {!isEditing && (
        <TextField
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => onChange('password', e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      )}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Role</InputLabel>
        <Select
          value={user.role}
          onChange={(e) => onChange('role', e.target.value)}
          label="Role"
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {user.role === 'Teacher' && (
        <TextField
          label="Subject"
          value={user.subject}
          onChange={(e) => onChange('subject', e.target.value)}
          required
          fullWidth
          margin="normal"
        />
      )}
      <Button variant="contained" color="primary" type="submit">
        {isEditing ? 'Update User' : 'Create User'}
      </Button>
    </form>
  );
};

export default UserForm;
