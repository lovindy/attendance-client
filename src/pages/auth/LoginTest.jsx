import React, { useState } from 'react';
import { useLoginMutation } from './authApi';
import { Button, TextField, Typography, Box } from '@mui/material';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      console.log('Login successful:', response);
      // Handle success, redirect or show a message
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Login</Typography>
      <TextField
        fullWidth
        margin="normal"
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>

      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error.message}</Typography>}
    </Box>
  );
};

export default LoginForm;
