import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppProvider } from './context/AppContext'; // 👈 import the context provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> {/* ✅ Wrap your app in the context */}
      <App />
    </AppProvider>
  </StrictMode>
);
