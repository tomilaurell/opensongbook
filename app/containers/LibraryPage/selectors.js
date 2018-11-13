import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the libraryPage state domain
 */

const selectLibraryPageDomain = state => state.get('libraryPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LibraryPage
 */

export const makeSelectBooks = () =>
  createSelector(selectLibraryPageDomain, substate => substate.get('books'));

export const makeSelectFetchingBooksStatus = () =>
  createSelector(selectLibraryPageDomain, substate =>
    substate.get('fething_books_status'),
  );
