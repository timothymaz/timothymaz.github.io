import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'cyber';
      return 'light';
    });
  };

  const setSpecificTheme = (newTheme) => {
    if (['light', 'dark', 'cyber'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    setSpecificTheme,
    isDark: theme === 'dark' || theme === 'cyber',
    isCyber: theme === 'cyber'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
