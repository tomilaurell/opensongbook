import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export const searchSongs = (books, term) => {
  const lowCaseTerm = term.toLowerCase();
  const book = books[0];
  const stream = from(book.songs).pipe(
    filter(song => {
      const matchedVerse = song.verses.find(verse =>
        verse.sentences.find(
          sentence => sentence.toLowerCase().search(lowCaseTerm) >= 0,
        ),
      );
      return !!matchedVerse;
    }),
    map(song => {
      const hitSong = Object.assign({}, song);
      hitSong.bookTitle = book.title;
      hitSong.id = book.id;
      return hitSong;
    }),
  );
  return stream;
};
