import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material'; // Added Box import here
import { AppContext, AppProvider } from './context/AppContext';
import { getTheme } from './utils/theme';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import AboutPage from './pages/AboutPage';
import NotFound from './components/ErrorPages/NotFound';
import ErrorExample from './components/ErrorPages/ErrorExample';

// Styles
import './App.css';

const AppContent = () => {
  const { theme } = useContext(AppContext);
  const muiTheme = getTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/error-example" element={<ErrorExample />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;