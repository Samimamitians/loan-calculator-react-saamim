// src/components/Layout/Layout.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%', // Ensure full width
      }}
    >
      <CssBaseline />
      <Header />
      <Box 
        component="main" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          flex: 1, 
          width: '100%', 
          px: 2 // Add some padding on the sides
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;