/*
 *
 * SongPage actions
 *
 */

import { FETCH_BOOK, CLEAN_STORE } from './constants';

export function fetchBook(id) {
  return {
    type: FETCH_BOOK,
    id,
  };
}

export function cleanStore() {
  return {
    type: CLEAN_STORE,
  };
}
