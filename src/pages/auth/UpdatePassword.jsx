import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../services/authApi';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      navigate('/profile'); // Redirect to a profile or dashboard page
    } catch (error) {
      setError('Failed to update password. Please try again.');
      console.error('Failed to update password:', error);
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
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Current Password"
                type="password"
                variant="outlined"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Box>
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
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UpdatePassword;
