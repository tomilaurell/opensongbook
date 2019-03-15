/*
 *
 * ExamplePage actions
 *
 */

import { DELETE_BOOK } from './constants';

export function deleteBook(id) {
  return {
    type: DELETE_BOOK,
    id,
  };
}
