import { takeLatest, call, put } from 'redux-saga/effects';
import {
  parseHymnBook,
  persistBook,
  getLibrary,
} from '../../service/songService';
import { loadBooks } from './actions';

import {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  LOAD_BOOKS,
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOKS_FAILURE,
} from './constants';

function* loadBooksSaga() {
  try {
    const books = yield call(getLibrary);
    yield put({ type: LOAD_BOOKS_SUCCESS, payload: books });
  } catch (errorMessage) {
    yield put({ type: LOAD_BOOKS_FAILURE, errorMessage });
  }
}

function* getBooksSaga(action) {
  const url = action.url;
  try {
    const response = yield fetch(url);
    const data = yield response.text();
    const songBook = parseHymnBook(data);
    yield persistBook(songBook);
    yield put(loadBooks());
    yield put({ type: GET_BOOKS_SUCCESS, payload: data });
  } catch (error) {
    console.log('RECEIVED ERROR', error);
    yield put({ type: GET_BOOKS_FAILURE, error });
  }
}

// Individual exports for testing
export default function* libraryPageSaga() {
  yield takeLatest(GET_BOOKS, getBooksSaga);
  yield takeLatest(LOAD_BOOKS, loadBooksSaga);
}
