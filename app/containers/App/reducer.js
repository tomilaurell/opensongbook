/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;
