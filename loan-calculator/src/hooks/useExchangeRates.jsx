import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const API_KEY = 'b303ce16524247f1a078914b';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

const useExchangeRates = () => {
  const { setExchangeRates, setLoading, setError } = useContext(AppContext);
  const [currencies, setCurrencies] = useState([]);

  const fetchExchangeRates = async (baseCurrency = 'USD') => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);

      if (response.data.result === 'success') {
        const rates = response.data.conversion_rates;
        setExchangeRates(rates);
        setCurrencies(Object.keys(rates));
        setLoading(false);
        return rates;
      } else {
        throw new Error('Failed to fetch exchange rates');
      }
    } catch (error) {
      setError(error.message || 'Error fetching exchange rates');
      setLoading(false);
      return null;
    }
  };

  const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
    if (!rates || !amount || !fromCurrency || !toCurrency) return 0;
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

    const amountInBase = amount / rates[fromCurrency];
    return amountInBase * rates[toCurrency];
  };

  // Initial fetch with default base currency
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return {
    fetchExchangeRates,
    convertCurrency,
    currencies,
  };
};

export default useExchangeRates;
