import React, { useContext } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AppContext } from '../../context/AppContext';

const ResultsSummary = ({ results }) => {
  const { currency } = useContext(AppContext);
  
  if (!results) return null;
  
  const { monthlyPayment, totalPayment, totalInterest } = results;
  const principal = totalPayment - totalInterest;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const pieData = [
    { name: 'Principal', value: principal, color: '#1976d2' },
    { name: 'Interest', value: totalInterest, color: '#f50057' }
  ];
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3,width:'100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Payment Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            {formatCurrency(monthlyPayment)} /month
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Principal Amount</Typography>
            <Typography variant="h6">{formatCurrency(principal)}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Total Interest</Typography>
            <Typography variant="h6" color="secondary">{formatCurrency(totalInterest)}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Total Payment</Typography>
            <Typography variant="h6">{formatCurrency(totalPayment)}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Payment Breakdown
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultsSummary;