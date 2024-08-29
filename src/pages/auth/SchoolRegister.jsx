import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../services/auth';
import { useCreateSchoolMutation } from '../../services/schoolApi';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import Logo from '../../data/svg/school logo.svg';

const SchoolRegister = () => {
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [createSchool, { isLoading: isCreateSchoolLoading }] =
    useCreateSchoolMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, sign up the user
      const user = await signup({ name, phone, address }).unwrap();

      // After signup is successful, create the school
      await createSchool({ name, phone, address, userId: user.id }).unwrap();

      // Redirect to the dashboard or the desired page
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign up or create school:', error);
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
              src={Logo}
              alt="Logo"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </Box>

          <Typography variant="h5" gutterBottom align="center">
            Introduce Your School to WaveTrack
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="School's Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSignupLoading || isCreateSchoolLoading}
              >
                {isSignupLoading || isCreateSchoolLoading
                  ? 'Processing...'
                  : 'Finish'}
              </Button>
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SchoolRegister;
