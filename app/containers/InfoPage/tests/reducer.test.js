import { fromJS } from 'immutable';
import infoPageReducer from '../reducer';

describe('infoPageReducer', () => {
  it('returns the initial state', () => {
    expect(infoPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
