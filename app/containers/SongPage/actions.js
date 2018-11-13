/*
 *
 * SongPage actions
 *
 */

import { FETCH_BOOK } from './constants';

export function fetchBook(id) {
  return {
    type: FETCH_BOOK,
    id,
  };
}
