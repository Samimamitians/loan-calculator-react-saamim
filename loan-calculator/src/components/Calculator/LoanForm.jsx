import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const LoanForm = ({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  loanTerm,
  setLoanTerm,
  calculateEMI,
  resetCalculator
}) => {
  const { currency, setCurrency } = useContext(AppContext);

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue.toString());
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Loan Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>
            Loan Amount ({currency})
          </Typography>
          <TextField
            fullWidth
            value={loanAmount}
            onChange={handleInputChange(setLoanAmount)}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
            }}
          />
          <Slider
            value={parseFloat(loanAmount) || 0}
            onChange={handleSliderChange(setLoanAmount)}
            min={1000}
            max={1000000}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${currency} ${value.toLocaleString()}`}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            Interest Rate (%)
          </Typography>
          <TextField
            fullWidth
            value={interestRate}
            onChange={handleInputChange(setInterestRate)}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <Slider
            value={parseFloat(interestRate) || 0}
            onChange={handleSliderChange(setInterestRate)}
            min={0.1}
            max={30}
            step={0.1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            Loan Term (years)
          </Typography>
          <TextField
            fullWidth
            value={loanTerm}
            onChange={handleInputChange(setLoanTerm)}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">years</InputAdornment>,
            }}
          />
          <Slider
            value={parseFloat(loanTerm) || 0}
            onChange={handleSliderChange(setLoanTerm)}
            min={1}
            max={30}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} years`}
          />
        </Grid>

        {/* Currency Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              value={currency}
              onChange={handleCurrencyChange}
              label="Currency"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              <MenuItem value="AUD">AUD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateEMI}
          fullWidth
          disabled={!loanAmount || !interestRate || !loanTerm}
        >
          Calculate
        </Button>
        <Button
          variant="outlined"
          onClick={resetCalculator}
          fullWidth
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default LoanForm;
