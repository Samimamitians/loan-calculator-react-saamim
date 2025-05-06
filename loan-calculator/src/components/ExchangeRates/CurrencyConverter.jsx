import React, { useState, useEffect, useContext } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { AppContext } from '../../context/AppContext';
import useExchangeRates from '../../hooks/useExchangeRates';

const CurrencyConverter = () => {
  const { exchangeRates, currency, setCurrency, isLoading } = useContext(AppContext);
  const { fetchExchangeRates, convertCurrency, currencies } = useExchangeRates();
  
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState(currency);
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  
  useEffect(() => {
    if (Object.keys(exchangeRates).length === 0) {
      fetchExchangeRates();
    }
  }, []);
  
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      handleConvert();
    }
  }, [exchangeRates, fromCurrency, toCurrency]);
  
  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setConvertedAmount(null);
      return;
    }
    
    const result = convertCurrency(
      parseFloat(amount),
      fromCurrency,
      toCurrency,
      exchangeRates
    );
    
    setConvertedAmount(result);
  };
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const formatCurrency = (value, currencyCode) => {
    if (value === null) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Currency Converter
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">{fromCurrency}</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <TextField
              select
              label="From Currency"
              fullWidth
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={handleSwapCurrencies} variant="outlined">
              ⇄
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={5}>
            <TextField
              select
              label="To Currency"
              fullWidth
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleConvert}
              fullWidth
            >
              Convert
            </Button>
          </Grid>
          
          {convertedAmount !== null && (
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {formatCurrency(convertedAmount, toCurrency)}
                </Typography>
                <Typography variant="subtitle2">
                  {`${formatCurrency(parseFloat(amount), fromCurrency)} = ${formatCurrency(convertedAmount, toCurrency)}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`Exchange rate: 1 ${fromCurrency} = ${exchangeRates[toCurrency] / exchangeRates[fromCurrency]} ${toCurrency}`}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Exchange rates are updated regularly. Last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CurrencyConverter;