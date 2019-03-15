/*
 *
 * ExamplePage reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function examplePageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default examplePageReducer;
