import React, { useState, useEffect } from 'react';

const LS_SONG_KEY = 'OpenSongbookSongContext';

export const SongContext = React.createContext({});
export const SongConsumer = SongContext.Consumer;

const getPersistedContext = () => localStorage.getItem(LS_SONG_KEY);

export function SongContextProvider({ children }) {
  const [currentSong, setCurrentSong] = useState();
  const [currentSongBook, setCurrentSongBook] = useState();
  useEffect(
    () => {
      updateContextParam(
        currentSong,
        setCurrentSong,
        `${currentSongBook}_songIndex`,
        1,
      );
      return null;
    },
    [currentSong],
  );
  useEffect(
    () => {
      updateContextParam(currentSongBook, setCurrentSongBook, 'songBookName');
      updateCurrentSong(currentSongBook, setCurrentSong);
      return null;
    },
    [currentSongBook],
  );
  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentSongBook,
        setCurrentSongBook,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

const updateCurrentSong = (currentSongBook, setter) => {
  const ctxString = getPersistedContext();
  const ctx = ctxString ? JSON.parse(ctxString) : {};
  const currentSongIndex = ctx[`${currentSongBook}_songIndex`];
  if (currentSongIndex) {
    setter(currentSongIndex);
  }
};

const updateContextParam = (currentParam, setter, contextKey, defaultValue) => {
  const ctxString = getPersistedContext();
  const ctx = ctxString ? JSON.parse(ctxString) : {};
  if (!currentParam) {
    const persistedValue = ctx[contextKey];
    if (persistedValue) {
      setter(persistedValue);
    } else if (defaultValue) {
      setter(defaultValue);
    }
  } else {
    const persistObject = {};
    persistObject[contextKey] = currentParam;
    const newContext = Object.assign(ctx, persistObject);
    localStorage.setItem(LS_SONG_KEY, JSON.stringify(newContext));
  }
};
