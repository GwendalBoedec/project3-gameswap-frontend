import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider   theme={{
    components: {
      PasswordInput: {
        styles: {
          input: {
            borderColor: '#444',
            '&:focus': {
              borderColor:"#ffd400",  
            },
            color: 'white',
            backgroundColor: '#2b2b3c'
          }
        }
      },
      MultiSelect: {
        styles: {
          input: {
            borderColor: '#444',
            '&:focus': {
              borderColor:"#ffd400",  
            },
            backgroundColor: '#2b2b3c',
            color: 'white',
          },
          dropdown: { backgroundColor: '#ffffff' },
          item: { color: '#444' }
        }
      }
    }
  }}
>
    <Router>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
    </Router>
    </MantineProvider>
  </StrictMode>,
)
