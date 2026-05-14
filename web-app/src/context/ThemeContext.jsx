import { createContext, useContext, useState, useEffect } from "react"

// Step 1 — Create the theme storage box
const ThemeContext = createContext()

// Step 2 — This wraps the whole app and shares theme with everyone
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  // Apply theme on mount and whenever isDark changes
  useEffect(() => {
    const theme = isDark ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    document.documentElement.style.colorScheme = theme
  }, [isDark])

  // This function switches dark/light mode
  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 3 — Other files use this to get theme info
export const useTheme = () => useContext(ThemeContext)