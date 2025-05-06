import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { SentimentDissatisfied } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <SentimentDissatisfied sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      
      <Typography variant="body1" paragraph>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to Home Page
      </Button>
    </Paper>
  );
};

export default NotFound;