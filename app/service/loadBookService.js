import { UNSHORTENER_ENDPOINT } from 'containers/App/constants';
import {
  parseHymnBook,
  persistBook,
  isLibraryFile,
  getBooksUrlsOfLibrary,
  generateTinyUrl,
} from './songService';

const isRealUrl = url =>
  url &&
  (url.startsWith('http:') ||
    url.startsWith('https:') ||
    url.startsWith('www.'));

export function* loadAndPersistBook(url) {
  const targetUrl = isRealUrl(url) ? url : generateTinyUrl(url);
  const longUrlResponse = yield fetch(
    `${UNSHORTENER_ENDPOINT}?url=${targetUrl}`,
  );
  const longUrlData = yield longUrlResponse.json();
  const { longUrl } = longUrlData;
  const response = yield fetch(longUrl);
  const data = yield response.text();
  if (isLibraryFile(data)) {
    console.log('Handle library file');
    const booksUrls = getBooksUrlsOfLibrary(data);
    let latestBookId;
    // eslint-disable-next-line no-restricted-syntax
    for (const bookUrl of booksUrls) {
      const bookResponse = yield fetch(bookUrl);
      const bookData = yield bookResponse.text();
      const songBook = parseHymnBook(bookData);
      latestBookId = yield persistBook(songBook, url);
    }
    return latestBookId;
  }
  console.log('Handle book file');
  const songBook = parseHymnBook(data);
  const bookId = yield persistBook(songBook, url);
  return bookId;
}
