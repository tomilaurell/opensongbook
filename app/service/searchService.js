import { from } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';

export function removeSpecials(str) {
  const lower = str.toLowerCase();
  const upper = str.toUpperCase();

  let res = '';
  for (let i = 0; i < lower.length; ++i) {
    if (lower[i] !== upper[i] || lower[i].trim() === '') res += str[i];
  }
  return res;
}

export const searchSongs = (books, term) => {
  const lowCaseTerm = removeSpecials(term.toLowerCase());
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
          sentence =>
            removeSpecials(sentence.toLowerCase()).search(lowCaseTerm) >= 0,
        ),
      );
      return !!matchedVerse;
    }),
  );
  return stream;
};
