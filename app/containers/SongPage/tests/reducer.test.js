import { fromJS } from 'immutable';
import songPageReducer from '../reducer';

describe('songPageReducer', () => {
  it('returns the initial state', () => {
    expect(songPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
