import crc32 from 'crc/crc32';
import db from './mydatabase';

export const getSong = (book, index) => {};

function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  // eslint-disable-next-line func-names
  return function(a, b) {
    if (!a[property] && !b[property]) {
      return 0;
    }
    if (!a[property]) {
      return -sortOrder;
    }
    if (!b[property]) {
      return sortOrder;
    }
    const result =
      // eslint-disable-next-line no-nested-ternary
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export const getLibrary = async () => {
  const books = await db.table('books').toArray();
  if (books.length === 0) {
    books.push(generateSongBook());
  }
  const sortedBooks = books.sort(dynamicSort('-openCounter'));
  return sortedBooks;
};

export const getBook = async id => {
  const books = await db
    .table('books')
    .where('id')
    .equals(parseInt(id, 0))
    .toArray();
  if (books && books.length > 0) {
    return books[0];
  }
  return generateSongBook();
};

export const deletePersistedBook = async id => {
  const intId = parseInt(id, 0);
  // const result = await db.table('books').delete(id);
  const result = await db
    .table('books')
    .where('id')
    .equals(intId)
    .delete();
  console.log('Book deleted result', result);
};

export async function increaseBookOpenCounter(id) {
  const book = await getBook(id);
  let counter = 1;
  if (book.openCounter) {
    counter += book.openCounter;
  }
  book.openCounter = counter;
  await db.books.update(parseInt(id, 0), book);
}

export const persistBook = async (book, url) => {
  book.checksum = crc32(JSON.stringify(book));
  book.url = url;
  book.created = new Date();
  book.openCounter = 0;
  const books = await db.table('books').toArray();
  const existingBookWithSameName = books.find(
    dbBook => dbBook.title === book.title,
  );
  if (existingBookWithSameName) {
    if (
      existingBookWithSameName.checksum === book.checksum &&
      existingBookWithSameName.url === book.url
    ) {
      console.log('Checksum match, no need to update');
      return existingBookWithSameName.id;
    }
    console.log('Updating book', existingBookWithSameName.id);
    await db.books.update(existingBookWithSameName.id, book);
    console.log('Book updated', existingBookWithSameName.id);
    return existingBookWithSameName.id;
  }
  if (book.songs && book.songs.length > 0) {
    return db.books.put(book);
  }
  return null;
};

export const isLibraryFile = data => data && data.startsWith('Library:');

export const getBooksUrlsOfLibrary = data => data.split('\n').slice(1);

export const generateTinyUrl = urlPostfix =>
  `https://tinyurl.com/opensongbook-${urlPostfix}`;

export const generateShareUrl = (baseUrl, bookShortName) =>
  `${baseUrl}?url=${bookShortName}`;

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
