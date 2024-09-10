import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../services/authApi';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../data/img/Logo.png';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [signup, { isLoading, isError, error, data }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  {...register('passwordConfirm', {
                    required: 'Confirm Password is required',
                  })}
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register('first_name', {
                    required: 'First Name is required',
                  })}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register('last_name', {
                    required: 'Last Name is required',
                  })}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  {...register('address', { required: 'Address is required' })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register('phone_number', {
                    required: 'Phone Number is required',
                  })}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  {...register('dob', {
                    required: 'Date of Birth is required',
                  })}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="School Name"
                  {...register('school_name', {
                    required: 'School Name is required',
                  })}
                  error={!!errors.school_name}
                  helperText={errors.school_name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="School Address"
                  {...register('school_address', {
                    required: 'School Address is required',
                  })}
                  error={!!errors.school_address}
                  helperText={errors.school_address?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="School Phone Number"
                  {...register('school_phone_number', {
                    required: 'School Phone Number is required',
                  })}
                  error={!!errors.school_phone_number}
                  helperText={errors.school_phone_number?.message}
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
