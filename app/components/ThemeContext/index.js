import React, { useState, useEffect } from 'react';

const LS_THEME_KEY = 'OpenSongbookUserSettings';

export const ThemeContext = React.createContext({});
export const ThemeConsumer = ThemeContext.Consumer;

const getPersistedContext = () => localStorage.getItem(LS_THEME_KEY);

export function ThemeProvider({ children }) {
  const [fontSize, setFontSize] = useState();
  useEffect(
    () => {
      if (!fontSize) {
        const ctxString = getPersistedContext();
        if (ctxString) {
          const ctx = JSON.parse(ctxString);
          const { fontSize: persistedFontSize } = ctx;
          setFontSize(persistedFontSize);
        } else {
          setFontSize(22);
        }
      } else {
        const persistObject = {
          fontSize,
        };
        localStorage.setItem(LS_THEME_KEY, JSON.stringify(persistObject));
      }
      return null;
    },
    [fontSize],
  );
  return (
    <ThemeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}
