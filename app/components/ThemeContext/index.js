import React, { useState } from 'react';

export const ThemeContext = React.createContext({});
export const ThemeConsumer = ThemeContext.Consumer;

export function ThemeProvider({ children }) {
  const [fontSize, setFontSize] = useState('20px');
  return (
    <ThemeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}
