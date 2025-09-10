import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem('theme')) || 'system'
  ); // 'light' | 'dark' | 'system'

  const toggleDarkMode = () => {
    const selectedTheme =
      theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(selectedTheme);
  };

  useEffect(() => {
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = media.matches ? 'dark' : 'light';
      document.documentElement.className = systemTheme;

      const listener = (e) => {
        document.documentElement.className = e.matches ? 'dark' : 'light';
      };
      media.addEventListener('change', listener);
      setTheme(systemTheme);

      return () => media.removeEventListener('change', listener);
    } else {
      document.documentElement.className = theme;
    }

    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
