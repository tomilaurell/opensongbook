import { from } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';

export const searchSongs = (books, term) => {
  const lowCaseTerm = term.toLowerCase();
  const stream = from(books).pipe(
    map(book =>
      book.songs.map(song => {
        const mappedSong = Object.assign({}, song);
        mappedSong.bookTitle = book.title;
        mappedSong.bookIndex = book.id;
        return mappedSong;
      }),
    ),
    flatMap(songs => songs),
    filter(song => {
      const matchedVerse = song.verses.find(verse =>
        verse.sentences.find(
          sentence => sentence.toLowerCase().search(lowCaseTerm) >= 0,
        ),
      );
      return !!matchedVerse;
    }),
  );
  return stream;
};
