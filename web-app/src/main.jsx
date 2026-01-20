import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/globals.css'
import { AuthProvider } from './auth/AuthContext'
import { RoleProvider } from "./auth/RoleContext"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
       <RoleProvider>
      <App />
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>
)
