/*
 *
 * LibraryPage actions
 *
 */

import { FETCH_BOOKS_FROM_URL } from './constants';

export function fetchBooksFromUrl(url) {
  return {
    type: FETCH_BOOKS_FROM_URL,
    url,
  };
}
