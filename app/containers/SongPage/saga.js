import { takeLatest, put, call } from 'redux-saga/effects';
import {
  FETCH_BOOKS_FROM_URL,
  FETCH_BOOKS_FROM_URL_SUCCESS,
  FETCH_BOOKS_FROM_URL_FAILURE,
} from 'containers/App/constants';
import {
  parseHymnBook,
  persistBook,
  getLibrary,
  getBook,
} from '../../service/songService';
import {
  FETCH_BOOK,
  FETCH_BOOK_FAILURE,
  FETCH_BOOK_SUCCESS,
} from './constants';
import { fetchBook } from './actions';

function* fetchBookSaga(action) {
  const id = action.id;
  try {
    const book = yield call(getBook, id);
    yield put({ type: FETCH_BOOK_SUCCESS, payload: book });
  } catch (errorMessage) {
    yield put({ type: FETCH_BOOK_FAILURE, errorMessage });
  }
}

function* getBooksSaga(action) {
  const url = action.url;
  try {
    const response = yield fetch(url);
    const data = yield response.text();
    const songBook = parseHymnBook(data);
    const bookId = yield persistBook(songBook, url);
    yield put(fetchBook(bookId));
    yield put({ type: FETCH_BOOKS_FROM_URL_SUCCESS, payload: data });
  } catch (error) {
    console.log('RECEIVED ERROR', error);
    yield put({ type: FETCH_BOOKS_FROM_URL_FAILURE, error });
  }
}

// Individual exports for testing
export default function* listCamerasPageSaga() {
  yield takeLatest(FETCH_BOOK, fetchBookSaga);
  yield takeLatest(FETCH_BOOKS_FROM_URL, getBooksSaga);
}
