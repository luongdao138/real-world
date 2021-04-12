import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import * as types from '../types/post';
import {
  getPost,
  getComments,
  countComments,
  postComment,
  deleteComment,
} from '../../services/post';
import { setLoading, setFinish } from '../actions/globalLoading';
import * as actions from '../actions/post';

function* loadPostById({ payload }) {
  try {
    yield put(setLoading());
    const res = yield call(getPost, payload);
    const user = yield select((state) => state.currentUser.info);
    const isOwn = user && user._id === res.data.creator._id ? true : false;
    const resComment = yield call(getComments, res.data._id, 10);
    const resCountComment = yield call(countComments, res.data._id);
    yield put(actions.loadCommentsSuccess(resComment.data));
    yield put(actions.loadCountComments(resCountComment.data.total));
    yield put(actions.loadPostSuccess(res.data, isOwn));
  } catch (error) {
    console.log(error);
  }
  yield put(setFinish());
}

function* loadMoreComments({ payload }) {
  const { id, limit } = payload;
  try {
    const res = yield call(getComments, id, limit);
    yield put(actions.loadCommentsSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* createComment({ payload }) {
  const { comment, id, token } = payload;
  try {
    const res = yield call(postComment, comment, id, token);
    const newComment = res.data.comment;
    newComment.creator = res.data.creator;
    yield put(actions.postCommentSuccess(newComment));
  } catch (error) {
    console.log(error);
  }
}

function* removeComment({ payload }) {
  const { id, token } = payload;
  try {
    const res = yield call(deleteComment, id, token);
    yield put(actions.deleteCommentSuccess(id));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function* watchLoadPost() {
  yield takeEvery(types.LOAD_POST, loadPostById);
}

function* watchLoadMoreComments() {
  yield takeEvery(types.LOAD_MORE_COMMENTS, loadMoreComments);
}

function* watchPostComment() {
  yield takeEvery(types.POST_COMMENT, createComment);
}

function* watchDeleteComment() {
  yield takeEvery(types.DELETE_COMMENT, removeComment);
}

export default function* postSaga() {
  yield all([
    watchLoadPost(),
    watchLoadMoreComments(),
    watchPostComment(),
    watchDeleteComment(),
  ]);
}
