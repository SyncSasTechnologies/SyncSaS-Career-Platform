import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/globals.css'
import { AuthProvider } from './auth/AuthContext'
import { RoleProvider } from "./auth/RoleContext"
import { ThemeProvider } from './context/ThemeContext'    // ← ADD THIS LINE


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>                  {/* ← ADD THIS */}
      <AuthProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>                 {/* ← ADD THIS */}
  </React.StrictMode>
)