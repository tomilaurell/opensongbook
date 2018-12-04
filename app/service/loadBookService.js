import { UNSHORTENER_ENDPOINT } from 'containers/App/constants';
import { parseHymnBook, persistBook } from './songService';

const isRealUrl = url =>
  url &&
  (url.startsWith('http:') ||
    url.startsWith('https:') ||
    url.startsWith('www.'));

export function* loadAndPersistBook(url) {
  const targetUrl = isRealUrl(url)
    ? url
    : `https://tinyurl.com/opensongbook-${url}`;
  const longUrlResponse = yield fetch(
    `${UNSHORTENER_ENDPOINT}?url=${targetUrl}`,
  );
  const longUrlData = yield longUrlResponse.json();
  const { longUrl } = longUrlData;
  const response = yield fetch(longUrl);
  const data = yield response.text();
  const songBook = parseHymnBook(data);
  const bookId = yield persistBook(songBook, url);
  return bookId;
}
