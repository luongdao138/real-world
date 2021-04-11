import { all } from 'redux-saga/effects';
import currentUserSaga from './currentUser';
import postListSaga from './postList';

export default function* rootSaga() {
  yield all([currentUserSaga(), postListSaga()]);
}
