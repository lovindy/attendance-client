import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../services/authApi';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../data/img/Logo.png';

const SignupForm = () => {
  const [signup, { isLoading, isError, error, data }] = useSignupMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    address: '',
    dob: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    school_name: '',
    school_address: '',
    school_phone_number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await signup(formData).unwrap();
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      console.error('Failed to signup:', err);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={6} style={{ padding: '2rem' }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom="1rem"
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </Box>
          <Typography variant="h5" gutterBottom align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="School Name"
                  name="school_name"
                  value={formData.school_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="School Address"
                  name="school_address"
                  value={formData.school_address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School Phone Number"
                  name="school_phone_number"
                  value={formData.school_phone_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </Box>
            {isError && (
              <Typography color="error">
                Error: {error.data?.message || 'An error occurred'}
              </Typography>
            )}
            {data && (
              <Typography color="primary">Signup successful!</Typography>
            )}
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
