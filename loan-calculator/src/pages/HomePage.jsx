// src/pages/HomePage.js
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import LoanForm from '../components/Calculator/LoanForm';
import ResultsSummary from '../components/Calculator/ResultsSummary';
import AmortizationTable from '../components/Calculator/AmortizationTable';
import useEMICalculator from '../hooks/useEMICalculator';

const HomePage = () => {
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    results,
    calculateEMI,
    resetCalculator
  } = useEMICalculator();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Loan EMI Calculator
      </Typography>
      
      <Typography variant="body1" paragraph>
        Calculate your Equated Monthly Installment (EMI) for any loan amount, interest rate, and term.
      </Typography>
      
      <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
        <Grid item xs={12} md={5}>
          <LoanForm
            loanAmount={loanAmount}
            setLoanAmount={setLoanAmount}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            loanTerm={loanTerm}
            setLoanTerm={setLoanTerm}
            calculateEMI={calculateEMI}
            resetCalculator={resetCalculator}
          />
        </Grid>
        
        <Grid item xs={12} md={7}>
          {results && <ResultsSummary results={results} />}
        </Grid>
        
        <Grid item xs={12}>
          {results && <AmortizationTable amortizationSchedule={results.amortizationSchedule} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;