/*
 *
 * LibraryPage reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_BOOKS_FROM_URL_SUCCESS } from 'containers/App/constants';
import { LOAD_BOOKS_SUCCESS } from './constants';

export const initialState = fromJS({});

function libraryPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_FROM_URL_SUCCESS:
      console.log('FETCH_BOOKS_FROM_URL_SUCCESS');
      return state.setIn(['fething_books_status'], 'FINISHED');
    case LOAD_BOOKS_SUCCESS:
      console.log('LOAD_BOOKS_SUCCESS');
      return state.setIn(['books'], fromJS(action.payload));
    default:
      return state;
  }
}

export default libraryPageReducer;
