import { fromJS } from 'immutable';
import libraryPageReducer from '../reducer';

describe('libraryPageReducer', () => {
  it('returns the initial state', () => {
    expect(libraryPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
