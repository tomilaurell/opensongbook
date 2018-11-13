import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the infoPage state domain
 */

const selectInfoPageDomain = state => state.get('infoPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by InfoPage
 */

const makeSelectInfoPage = () =>
  createSelector(selectInfoPageDomain, substate => substate.toJS());

export default makeSelectInfoPage;
export { selectInfoPageDomain };
