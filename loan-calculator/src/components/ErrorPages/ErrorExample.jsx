import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Alert, AlertTitle } from '@mui/material';
import { Warning } from '@mui/icons-material';

const ErrorExample = () => {
  const [error, setError] = useState(null);
  
  const triggerError = () => {
    try {
      // Intentionally cause an error
      const obj = null;
      obj.nonExistentMethod();
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Error Page Example
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates how the application handles errors gracefully.
        Click the button below to trigger a JavaScript error.
      </Typography>
      
      <Button
        variant="contained"
        color="error"
        onClick={triggerError}
        startIcon={<Warning />}
        sx={{ mb: 3 }}
      >
        Trigger Error
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default ErrorExample;