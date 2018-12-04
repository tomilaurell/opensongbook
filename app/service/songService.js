import crc32 from 'crc/crc32';
import db from './mydatabase';

export const getSong = (book, index) => {};

export const getLibrary = async () => {
  const books = await db.table('books').toArray();
  if (books.length === 0) {
    books.push(generateSongBook());
  }
  return books;
};

export const getBook = async id => {
  // FIXME : should use id in query
  const books = await db.table('books').toArray();
  const book = books.find(dbBook => dbBook.id === id);
  if (book) {
    return book;
  }
  if (books.length > 0) {
    return books[0];
  }
  return generateSongBook();
};

export const persistBook = async (book, url) => {
  book.checksum = crc32(JSON.stringify(book));
  book.url = url;
  const books = await db.table('books').toArray();
  const existingBookWithSameName = books.find(
    dbBook => dbBook.title === book.title,
  );
  if (existingBookWithSameName) {
    if (existingBookWithSameName.checksum === book.checksum) {
      console.log('Checksum match, no need to update');
      return existingBookWithSameName.id;
    }
    console.log('Updating book', existingBookWithSameName.id);
    db.books.update(existingBookWithSameName.id, book);
    console.log('Book updated', existingBookWithSameName.id);
    return existingBookWithSameName.id;
  }
  if (book.songs && book.songs.length > 0) {
    return db.books.put(book);
  }
  return null;
};

export const parseHymnBook = rawBook => {
  const rows = rawBook.split('\n');
  const rawSongs = [];
  let rSong = [];
  for (let rowIndex = 2; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex].trim();
    if (row) {
      try {
        const songIndex = Number(row);
        if (songIndex > 0) {
          rawSongs.push(rSong);
          rSong = [];
        }
      } catch (e) {}
      rSong.push(row);
    }
  }
  rawSongs.push(rSong);

  const songs = [];
  rawSongs.splice(0, 1);
  rawSongs.forEach(rawSong => {
    const song = {
      index: Number(rawSong[0]),
      title: rawSong[1],
      verses: [],
    };
    for (let rowIndex = 2; rowIndex < rawSong.length; rowIndex++) {
      const rawVerse = rawSong[rowIndex];
      const sentences = rawVerse
        .substring(rawVerse.indexOf('.') + 1)
        .split('/');
      song.verses.push({
        index: Number(rawVerse.substring(0, rawVerse.indexOf('.'))),
        sentences: sentences.map(sentence => sentence.trim()),
      });
    }
    songs.push(song);
  });
  const title = rows[0].trim();
  const coverImage = rows[1];
  return {
    title,
    coverImage,
    songs,
  };
};

export const generateSongBook = () => {
  const songs = [];
  for (let index = 1; index < 101; index++) {
    const countOfVerses = ((index % 3) + 1) * 2;
    const verses = [];
    for (let i = 1; i < countOfVerses; i++) {
      verses.push(i);
    }
    songs.push({
      index,
      verses: verses.map(verseIndex => ({
        index: verseIndex,
        sentences: [
          `Autolla ajetaan varo-varovasti,`,
          'ettei kaatuisi kallis lasti.',
          'Suoraa tietä, suoraa tietä,',
          'mäkiä on matkan varrella.',
          'Pois kaikki lapset alta,',
          'tie näyttää kapealta.',
          'Mittari näyttää kaheksaa kymppiä,',
          'jarrut on epäkunnossa',
        ],
      })),
    });
  }

  return {
    id: 0,
    title: 'Lasten lauluja',
    songs,
  };
};
