import React, { useState, useContext } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Box, TextField, MenuItem
} from '@mui/material';
import { AppContext } from '../../context/AppContext';

const currencyOptions = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD', 'AUD'];

const AmortizationTable = ({ amortizationSchedule }) => {
  const { currency, setCurrency } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!amortizationSchedule || amortizationSchedule.length === 0) return null;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Amortization Schedule
        </Typography>
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          size="small"
          sx={{ width: 130 }}
        >
          {currencyOptions.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell align="right">Principal</TableCell>
              <TableCell align="right">Interest</TableCell>
              <TableCell align="right">Total Interest Paid</TableCell>
              <TableCell align="right">Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{formatCurrency(row.payment)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.principalPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interestPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.totalInterestPaid)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.remainingBalance)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={amortizationSchedule.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Note: This schedule shows key periods in the loan term. The first month, yearly intervals, and the final payment are displayed.
        </Typography>
      </Box>
    </Paper>
  );
};

export default AmortizationTable;
