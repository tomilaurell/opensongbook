import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  FETCH_BOOKS_FROM_URL,
  FETCH_BOOKS_FROM_URL_SUCCESS,
  FETCH_BOOKS_FROM_URL_FAILURE,
} from 'containers/App/constants';
import {
  parseHymnBook,
  persistBook,
  getLibrary,
} from '../../service/songService';
import { loadBooks } from './actions';
import {
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
    const bookId = yield persistBook(songBook, url);
    yield put(push(`/book/${bookId}`));
    yield put(loadBooks());
    yield put({ type: FETCH_BOOKS_FROM_URL_SUCCESS, payload: data });
  } catch (error) {
    console.log('RECEIVED ERROR', error);
    yield put({ type: FETCH_BOOKS_FROM_URL_FAILURE, error });
  }
}

// Individual exports for testing
export default function* libraryPageSaga() {
  yield takeLatest(FETCH_BOOKS_FROM_URL, getBooksSaga);
  yield takeLatest(LOAD_BOOKS, loadBooksSaga);
}
