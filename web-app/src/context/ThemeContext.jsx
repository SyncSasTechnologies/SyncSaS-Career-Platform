import { createContext, useContext, useState } from "react"

// Step 1 — Create the theme storage box
const ThemeContext = createContext()

// Step 2 — This wraps the whole app and shares theme with everyone
export function ThemeProvider({ children }) {

  const [isDark, setIsDark] = useState(false)

  // This function switches dark/light mode
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 3 — Other files use this to get theme info
export const useTheme = () => useContext(ThemeContext)