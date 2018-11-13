/*
 *
 * LibraryPage actions
 *
 */

import { GET_BOOKS, LOAD_BOOKS } from './constants';

export function fetchBooks(url) {
  return {
    type: GET_BOOKS,
    url,
  };
}

export function loadBooks() {
  return {
    type: LOAD_BOOKS,
  };
}
