import { all } from 'redux-saga/effects';
import currentUserSaga from './currentUser';
import postSaga from './post';
import postListSaga from './postList';

export default function* rootSaga() {
  yield all([currentUserSaga(), postListSaga(), postSaga()]);
}
