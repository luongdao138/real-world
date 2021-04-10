import { all, takeEvery, call, put, delay } from 'redux-saga/effects';
import * as actions from '../actions/currentUser';
import * as types from '../types/currentUser';
import {
  login,
  getUserLoginByToken,
  forgotPassword,
  resetPassword,
} from '../../services/user';
import { setLoading, setFinish } from '../actions/globalLoading';

function* loginUser({ type, payload }) {
  try {
    yield put(setLoading());
    const res = yield call(login, payload);
    const res2 = yield call(getUserLoginByToken, res.data.token);

    yield put(
      actions.loginSuccess({ user: res2.data.user, token: res.data.token })
    );
    localStorage.setItem('token', res.data.token);
    // yield delay(1000);
    yield put(setFinish());
  } catch (error) {
    // yield delay(1000);
    yield put(actions.loginFailure('Email or password is not correct!'));
    yield put(setFinish());
  }
}

function* fetchUser({ payload }) {
  try {
    const res = yield call(getUserLoginByToken, payload);
    yield put(actions.loginSuccess({ user: res.data.user, token: payload }));
  } catch (error) {
    yield put(actions.loginFailure());
  }
}

function* logout() {
  localStorage.removeItem('token');
  yield put(actions.logoutSuccess());
}

function* forgotPw({ payload }) {
  const { email, history } = payload;
  yield put(setLoading());
  try {
    const res = yield call(forgotPassword, email);
    if (res.data.success) {
      yield put(actions.forgotPasswordSuccess(res.data.message));
      // history.push('/');
      yield put(setFinish());
    } else {
      yield put(actions.forgotPasswordFailure(res.data.error));
      yield put(setFinish());
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetPw({ payload }) {
  console.log(payload);
  const { token, newPassword } = payload;
  try {
    const res = yield call(resetPassword, token, newPassword);
    if (res.data.success) {
      yield put(actions.resetPasswordSuccess(res.data.message));
    } else {
      yield put(actions.resetPasswordFailure(res.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchLogin() {
  yield takeEvery(types.LOGIN, loginUser);
}

function* watchFetchUser() {
  yield takeEvery(types.FETCH_USER, fetchUser);
}

function* watchLogout() {
  yield takeEvery(types.LOGOUT, logout);
}

function* watchForgotPassword() {
  yield takeEvery(types.FORGOT_PW, forgotPw);
}

function* watchResetPassword() {
  yield takeEvery(types.RESET_PW, resetPw);
}

export default function* currentUserSaga() {
  yield all([
    watchLogin(),
    watchFetchUser(),
    watchLogout(),
    watchForgotPassword(),
    watchResetPassword(),
  ]);
}
