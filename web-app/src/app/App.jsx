import AppRoutes from './AppRoutes'
import { ThemeProvider } from '../context/ThemeContext'
import '../styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App