import React from 'react';
import { Container, Grid, Typography, Link, Box, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => (
  <footer>
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: 4,
        mt: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              EdTech Attendance Management
            </Typography>
            <Typography variant="body2" color="textSecondary">
              &copy; 2024 EdTech Attendance Management. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="/" variant="body2" color="textPrimary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="textPrimary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="textPrimary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="textPrimary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" variant="body2" color="textPrimary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="#" color="inherit" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link
                href="#"
                color="inherit"
                aria-label="Twitter"
                sx={{ mx: 2 }}
              >
                <Twitter />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link
                href="#"
                color="inherit"
                aria-label="LinkedIn"
                sx={{ ml: 2 }}
              >
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Divider />
    <Box
      sx={{
        bgcolor: 'background.default',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        HexCode+ &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  </footer>
);

export default Footer;
