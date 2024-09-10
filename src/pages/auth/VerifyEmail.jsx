// src/pages/auth/VerifyEmail.jsx
import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
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
            Check Your Email
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            We have sent a password reset link to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </Typography>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              If you didn't receive the email,{' '}
              <Link to="/reset-password">click here</Link> to try again.
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
