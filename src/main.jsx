import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'; // Make sure this import exists
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AuthProvider>
  <App />
    </AuthProvider>
   
  </BrowserRouter>
</StrictMode>
)
