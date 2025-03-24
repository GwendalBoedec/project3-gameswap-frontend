import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'
import MantineThemeProvider from './config/MantineThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineThemeProvider>
    <Router>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
    </Router>
    </MantineThemeProvider>
  </StrictMode>,
)
