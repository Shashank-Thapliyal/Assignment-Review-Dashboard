import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AssignmentProvider } from './context/AssignmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AssignmentProvider>
          <App />
        </AssignmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
