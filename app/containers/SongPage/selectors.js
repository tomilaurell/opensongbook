import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the songPage state domain
 */

const selectSongPageDomain = state => state.get('songPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectBook = () =>
  createSelector(selectSongPageDomain, substate => substate.get('book'));
