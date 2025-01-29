// Objective: Create a context to handle the theme of the app
import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  theme: string;
  handleThemeChange: () => void;
};

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ChildrenType) => {
  // Provide the current theme to the entire app
  const [theme, setTheme] = useState<string>("light-mode");

  // Function to change the theme
  const handleThemeChange = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-mode" ? "dark-mode" : "light-mode",
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create custom hook to use the theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};
