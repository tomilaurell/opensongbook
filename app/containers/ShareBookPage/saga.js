import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { deletePersistedBook } from '../../service/songService';
import { DELETE_BOOK } from './constants';

function* deleteBookSaga(action) {
  const id = action.id;
  yield call(deletePersistedBook, id);
  yield put(push(`/share`));
}

// Individual exports for testing
export default function* shareBookPageSaga() {
  yield takeLatest(DELETE_BOOK, deleteBookSaga);
}
