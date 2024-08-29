import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import WaveTrackLogo from '../data/img/Logo.png'; // Import as a variable

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    marginRight: theme.spacing(1),
    height: '40px', // Adjust the size as needed
  },
  navLinks: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  navButton: {
    margin: theme.spacing(1),
    textDecoration: 'none', // Ensure no underline on the link
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={classes.logo}>
              <img
                src={WaveTrackLogo}
                alt="WaveTrack Logo"
                className={classes.logoImage}
              />
              <Typography variant="h6">WaveTrack</Typography>
            </Box>
            <Box className={classes.navLinks}>
              <Button className={classes.navButton} color="inherit">
                Home
              </Button>
              <Button className={classes.navButton} color="inherit">
                Features
              </Button>
              <Button className={classes.navButton} color="inherit">
                Pricing
              </Button>
              <Button className={classes.navButton} color="inherit">
                Contact
              </Button>
              <Button className={classes.navButton} color="inherit">
                About
              </Button>
            </Box>
            <Link to="/signup" className={classes.navButton}>
              <Button color="primary" variant="outlined">
                Sign Up
              </Button>
            </Link>
            <Link to="/login" className={classes.navButton}>
              <Button color="primary" variant="contained">
                Sign In
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="lg"
        style={{ textAlign: 'center', marginTop: '50px' }}
      >
        <Typography variant="h3" gutterBottom>
          Powerful Time Tracking Made Easy
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Streamline your workforce management with our intuitive time tracking
          solution.
        </Typography>
        <Button variant="contained" color="primary" style={{ margin: '10px' }}>
          Get Started
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: '10px' }}>
          Learn More
        </Button>
      </Container>
    </div>
  );
}

export default LandingPage;
