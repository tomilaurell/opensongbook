/*
 *
 * SongPage reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_BOOK_SUCCESS } from './constants';

export const initialState = fromJS({});

function songPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      return state.setIn(['book'], fromJS(action.payload));
    default:
      return state;
  }
}

export default songPageReducer;
