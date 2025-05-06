import React, { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  currency: localStorage.getItem('currency') || 'USD',
  exchangeRates: {},
  isLoading: false,
  error: null
};

// Create context
export const AppContext = createContext(initialState);

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    case 'SET_CURRENCY':
      localStorage.setItem('currency', action.payload);
      return { ...state, currency: action.payload };
    case 'SET_EXCHANGE_RATES':
      return { ...state, exchangeRates: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setCurrency = (currency) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  };

  const setExchangeRates = (rates) => {
    dispatch({ type: 'SET_EXCHANGE_RATES', payload: rates });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = state.theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setTheme,
        setCurrency,
        setExchangeRates,
        setLoading,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};