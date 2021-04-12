import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import * as types from '../types/user';
import * as services from '../../services/userInfo';
import * as actions from '../actions/user';
import { setFinish, setLoading } from '../actions/globalLoading';

function* loadUser({ payload }) {
  try {
    yield put(setLoading());
    const res = yield call(services.loadUserInfo, payload);
    const details = yield call(services.loadUserDetail, payload);
    const result = {
      info: res.data,
      favoritePosts: details[1].data,
      posts: details[0].data,
      followers: details[2].data,
      following: details[3].data,
    };

    const currentUser = yield select((state) => state.currentUser.info);
    if (!currentUser) result.isOwn = false;
    else {
      result.isOwn = currentUser._id === res.data._id;
    }

    if (currentUser)
      result.isFollowed = currentUser.follow.includes(res.data._id);

    yield put(actions.loadUserInfoSuccess(result));
  } catch (error) {
    console.log(error);
  }
  yield put(setFinish());
}

function* loadPersonalPosts({ payload }) {
  try {
    const res = yield call(services.getPersonalPosts, payload);
    yield put(actions.loadPersonalPostsSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* loadFavoritePosts({ payload }) {
  try {
    const res = yield call(services.getFavoritePosts, payload);
    yield put(actions.loadFavoritePostsSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* followUser({ payload }) {
  const { id, token } = payload;
  try {
    yield call(services.follow, id, token);
    yield put(actions.followSuccess(id));
  } catch (error) {}
}

function* unfollowUser({ payload }) {
  const { id, token } = payload;
  try {
    yield call(services.unfollow, id, token);
    yield put(actions.unfollowSuccess(id));
  } catch (error) {}
}

function* watchLoadUser() {
  yield takeEvery(types.LOAD_USER_INFO, loadUser);
}

function* watchLoadPersonPost() {
  yield takeEvery(types.LOAD_OWN_POST, loadPersonalPosts);
}

function* watchLoadFavoritePost() {
  yield takeEvery(types.LOAD_FAVORITE_POST, loadFavoritePosts);
}

function* watchFollow() {
  yield takeEvery(types.FOLLOW, followUser);
}

function* watchUnFollow() {
  yield takeEvery(types.UNFOLLOW, unfollowUser);
}

export default function* userSaga() {
  yield all([
    watchLoadUser(),
    watchLoadPersonPost(),
    watchLoadFavoritePost(),
    watchUnFollow(),
    watchFollow(),
  ]);
}
