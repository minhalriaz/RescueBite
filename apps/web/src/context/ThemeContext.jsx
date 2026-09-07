import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEY = "rescuebite-theme";
const THEMES = { light: "light", dark: "dark" };

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === THEMES.light || saved === THEMES.dark) return saved;
  } catch {
    // ignore
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEMES.dark : THEMES.light;
  }
  return THEMES.light;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const applyTheme = useCallback((next) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === THEMES.dark);
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
  }, []);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === THEMES.dark ? THEMES.light : THEMES.dark));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme, isDark: theme === THEMES.dark }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }
  return context;
}