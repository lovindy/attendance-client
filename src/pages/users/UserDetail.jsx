import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUserByIdQuery } from '../../services/usersApi';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  IconButton,
  Divider,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchUserByIdQuery(id);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="sm">
        <Alert severity="error">Error loading user details</Alert>
      </Container>
    );

  const user = data?.data.data;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        USER DETAIL
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        These are user's information
      </Typography>

      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Avatar
              src={user?.avatar || '/path/to/default-avatar.png'} // Replace with actual avatar URL or default avatar
              alt={user?.name}
              sx={{ width: 128, height: 128, mx: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">User Information</Typography>
              <Box>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>User ID:</strong> {user?.user_id || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {user?.name || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Age:</strong> {user?.age || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {user?.gender || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Date of Birth:</strong> {user?.dob || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {user?.phone || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user?.email || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Address:</strong> {user?.address || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default UserDetail;
