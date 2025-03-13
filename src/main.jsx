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
            color: '#000000',
            borderColor: '#444',
            '&:focus': {
              borderColor:"#ffd400",  
            },
            backgroundColor: '#2b2b3c',
            color: '#fff',
          },
          dropdown: { 
            color: '#000000',
            backgroundColor: '#2b2b3c',
            border: '1px solid #444',},
          item: { color: '#000000',
            '&[data-hovered]': {
            backgroundColor: '#ffd400', // 
            color: '#000', // Texte foncé pour contraste
          },
          value: {
            color: '#000000', // Couleur du texte des valeurs sélectionnées
            backgroundColor: '#444', // Fond foncé pour contraste
      borderRadius: '4px', // Optionnel, améliore le rendu visuel
      padding: '2px 6px' // Ajuste l'espacement pour éviter un fond blanc par défaut
          },
        },

          
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
