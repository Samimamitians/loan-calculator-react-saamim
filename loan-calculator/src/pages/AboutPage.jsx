
import React from 'react';
import { Typography, Box, Paper, Link, Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About This App
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%' }}>
        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application built using <strong>React JS</strong> and <strong>Material UI</strong>. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<GitHub />}
            component={Link}
            href="https://github.com/Samimamitians/loan-calculator-react-saamim"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ px: 4, py: 1.5 }}
          >
            View GitHub Repository
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutPage;