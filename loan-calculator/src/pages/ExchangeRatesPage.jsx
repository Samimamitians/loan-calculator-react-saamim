import React from 'react';
import { Typography, Box } from '@mui/material';
import CurrencyConverter from '../components/ExchangeRates/CurrencyConverter';
import ExchangeRateTable from '../components/ExchangeRates/ExchangeRateTable';

const ExchangeRatesPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Exchange Rates (LIVE)
      </Typography>
      
      <Typography variant="body1" paragraph>
        Convert between currencies and view the latest exchange rates.
      </Typography>
      
      <CurrencyConverter />
      <ExchangeRateTable />
    </Box>
  );
};

export default ExchangeRatesPage;