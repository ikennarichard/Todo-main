import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevSate => !prevSate)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}