// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../services/authApi';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      navigate('/verify-email'); // Redirect to the CheckEmail page
    } catch (error) {
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
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? 'Sending...' : 'Reset Password'}
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Remembered your password? <Link to="/login">Log In</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
