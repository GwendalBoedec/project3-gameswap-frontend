import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }}>
    <Router>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
    </Router>
    </MantineProvider>
  </StrictMode>,
)
