/*
 *
 * SongPage reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_BOOK_SUCCESS, CLEAN_STORE } from './constants';

export const initialState = fromJS({});

function songPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      return state.setIn(['book'], fromJS(action.payload));
    case CLEAN_STORE:
      return state.setIn(['book'], null);
    default:
      return state;
  }
}

export default songPageReducer;
