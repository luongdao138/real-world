import { all, takeEvery, call, put, debounce } from 'redux-saga/effects';
import * as actions from '../actions/postList';
import * as types from '../types/postList';
import {
  loadGlobalPost,
  loadPersonalPost,
  getGlobalPostCount,
  getPersonalPostCount,
  updateLike,
  addPost,
} from '../../services/postList';
import { setFinish, setLoading } from '../actions/globalLoading';

function* loadGlobalPosts({ payload }) {
  const { page, limit } = payload;
  try {
    yield put(setLoading());
    const { data } = yield call(getGlobalPostCount);
    const res = yield call(loadGlobalPost, page, limit);
    yield put(actions.loadGlobalPostSuccess(page, data.total, res.data));
    yield put(setFinish());
  } catch (error) {
    console.log(error);
    yield put(setFinish());
  }
}

function* loadPersonalPosts({ payload }) {
  const { page, limit, token } = payload;
  try {
    yield put(setLoading());
    const res = yield call(loadPersonalPost, page, limit, token);
    const totalRes = yield call(getPersonalPostCount, token);
    yield put(
      actions.loadPersonalPostSuccess(page, totalRes.data.total, res.data)
    );
    yield put(setFinish());
  } catch (error) {
    console.log(error);
    yield put(setFinish());
  }
}

function* updatePostLike({ payload }) {
  const { id, token } = payload;
  try {
    const res = yield call(updateLike, id, token);
    yield put(actions.updateLikeSuccess(id, res.data.message));
  } catch (error) {
    console.log(error);
  }
}

function* createPost({ payload }) {
  const { post, token, history } = payload;
  try {
    yield put(setLoading());
    const res = yield call(addPost, post, token);

    history.push('/');
  } catch (error) {
    console.log(error);
  }
  yield put(setFinish());
}

function* watchLoadGlobalPost() {
  yield takeEvery(types.LOAD_GLOBAL_POST, loadGlobalPosts);
}

function* watchLoadPersonalPost() {
  yield takeEvery(types.LOAD_PERSONAL_POST, loadPersonalPosts);
}

function* watchUpdateLike() {
  yield debounce(1000, types.UPDATE_LIKE, updatePostLike);
}

function* watchCreatePost() {
  yield takeEvery(types.ADD_POST, createPost);
}

export default function* postListSaga() {
  yield all([
    watchLoadGlobalPost(),
    watchLoadPersonalPost(),
    watchUpdateLike(),
    watchCreatePost(),
  ]);
}
