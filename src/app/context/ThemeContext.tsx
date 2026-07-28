import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeState>({ isDark: false, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem("tanglaw-theme");
      // Light Mode is the default for first-time visitors (no stored preference)
      return stored ? stored === "dark" : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tanglaw-theme", isDark ? "dark" : "light");
    } catch {}
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Apply data-theme on initial render to prevent FOUC
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
