// src/pages/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../services/authApi';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate(); // For navigation after successful reset
  const [resetPassword, { isLoading }] = useResetPasswordMutation(); // Mutation for backend request
  const [newPassword, setNewPassword] = useState(''); // New password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [error, setError] = useState(null); // For displaying error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Send the new password and token to the backend
      await resetPassword({ token, newPassword }).unwrap();

      // Clear error and navigate to login page after successful reset
      setError(null);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      // Handle errors from the backend
      setError('Failed to reset password. Please try again.');
      console.error('Failed to reset password:', error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} style={{ padding: '2rem' }}>
          <Typography variant="h5" gutterBottom align="center">
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Box>
            {error && (
              <Box mb={2} textAlign="center">
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
