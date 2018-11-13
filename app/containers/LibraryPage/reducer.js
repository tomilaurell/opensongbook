/*
 *
 * LibraryPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_BOOKS_SUCCESS, LOAD_BOOKS_SUCCESS } from './constants';

export const initialState = fromJS({});

function libraryPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS_SUCCESS:
      return state.setIn(['fething_books_status'], 'FINISHED');
    case LOAD_BOOKS_SUCCESS:
      return state.setIn(['books'], fromJS(action.payload));
    default:
      return state;
  }
}

export default libraryPageReducer;
