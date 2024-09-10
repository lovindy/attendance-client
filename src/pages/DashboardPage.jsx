import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchUsersQuery } from '../services/usersApi';

const DashboardPage = () => {
  const { data: response, isLoading, error } = useFetchUsersQuery();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load data</Typography>;
  }

  const users = response?.data || [];
  const teachers = users.filter((user) => user.role === 'teacher');
  const students = users.filter((user) => user.role === 'student');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5">Total Teachers</Typography>
                  <Typography variant="h3">{teachers.length || 0}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5">Total Students</Typography>
                  <Typography variant="h3">{students.length || 0}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher List Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                There are {teachers.length || 0} teachers
              </Typography>

              {teachers.length === 0 ? (
                <Typography>No teachers available</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <input type="checkbox" />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.user_id}>
                          <TableCell padding="checkbox">
                            <input type="checkbox" />
                          </TableCell>
                          <TableCell>{teacher.name}</TableCell>
                          <TableCell>{teacher.gender}</TableCell>
                          <TableCell>{teacher.email}</TableCell>
                          <TableCell>{teacher.phone}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={(event) =>
                                handleMenuOpen(event, teacher)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={
                                Boolean(anchorEl) &&
                                selectedUser?.id === teacher.user_id
                              }
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={handleMenuClose}>
                                <EditIcon sx={{ mr: 1 }} />
                                Edit
                              </MenuItem>
                              <MenuItem onClick={handleMenuClose}>
                                <DeleteIcon sx={{ mr: 1 }} />
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
