import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate separately
import { useLoginMutation } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import LoginImage from '../../data/svg/Logo.svg'; // Adjust the path if necessary

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error('Failed to login:', error);
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
          {/* Logo */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginBottom: '1rem' }}
          >
            <img
              src={LoginImage}
              alt="Logo"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </Box>

          <Typography variant="h5" gutterBottom align="center">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
