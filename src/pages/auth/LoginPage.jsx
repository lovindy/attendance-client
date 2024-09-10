import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Link,
} from '@mui/material';
import LoginImage from '../../data/img/Logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      await login({ email, password }).unwrap();
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      console.error('Failed to login:', error);
      setErrorMessage(
        'Login failed. Please check your credentials and try again.'
      );
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
          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}
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
              Don't have an account?{' '}
              <Link component={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Forgot your password?{' '}
              <Link component={RouterLink} to="/forgot-password">
                Reset Password
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
