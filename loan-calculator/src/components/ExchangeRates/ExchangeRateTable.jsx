import React, { useState, useContext } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
  CircularProgress
} from '@mui/material';
import { AppContext } from '../../context/AppContext';

const ExchangeRateTable = () => {
  const { exchangeRates, currency, isLoading } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Filter and sort currencies
  const filteredCurrencies = Object.keys(exchangeRates)
    .filter(code => code.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Exchange Rates
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Currency"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          placeholder="USD, EUR, GBP..."
        />
      </Box>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Currency Code</TableCell>
                  <TableCell align="right">Rate (1 {currency} =)</TableCell>
                  <TableCell align="right">Inverse Rate (1 Currency =)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCurrencies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((code) => {
                    const rate = exchangeRates[code] / exchangeRates[currency];
                    const inverseRate = exchangeRates[currency] / exchangeRates[code];
                    
                    return (
                      <TableRow key={code}>
                        <TableCell component="th" scope="row">
                          {code}
                        </TableCell>
                        <TableCell align="right">
                          {rate.toFixed(6)} {code}
                        </TableCell>
                        <TableCell align="right">
                          {inverseRate.toFixed(6)} {currency}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredCurrencies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Data provided by ExchangeRate-API. Last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ExchangeRateTable;