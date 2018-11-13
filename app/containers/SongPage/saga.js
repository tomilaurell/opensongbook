import { takeLatest, put, call } from 'redux-saga/effects';
import { getBook } from '../../service/songService';

import {
  FETCH_BOOK,
  FETCH_BOOK_FAILURE,
  FETCH_BOOK_SUCCESS,
} from './constants';

function* fetchBookSaga(action) {
  const id = action.id;
  try {
    const book = yield call(getBook, id);
    yield put({ type: FETCH_BOOK_SUCCESS, payload: book });
  } catch (errorMessage) {
    yield put({ type: FETCH_BOOK_FAILURE, errorMessage });
  }
}

// Individual exports for testing
export default function* listCamerasPageSaga() {
  yield takeLatest(FETCH_BOOK, fetchBookSaga);
}
