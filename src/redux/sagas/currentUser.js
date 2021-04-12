import { all, takeEvery, call, put, delay } from 'redux-saga/effects';
import * as actions from '../actions/currentUser';
import * as types from '../types/currentUser';
import {
  login,
  getUserLoginByToken,
  forgotPassword,
  resetPassword,
  signup,
  activate,
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

function* logout({ payload }) {
  localStorage.removeItem('token');
  yield put(actions.logoutSuccess());
  payload.push('/');
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

function* signupUser({ payload }) {
  try {
    yield put(setLoading());
    const res = yield call(signup, payload);
    if (res.data.success) {
      yield put(actions.signupSuccess(res.data.message));
    } else yield put(actions.signupFailure(res.data.error));
  } catch (error) {
    console.log(error);
  }
  yield put(setFinish());
}

function* activateUser({ payload }) {
  try {
    yield put(setLoading());
    const res = yield call(activate, payload);
    if (res.data.success) {
      alert('Register successfully! You can close this tab to login!');
    } else alert('Register failed!');
  } catch (error) {
    console.log(error);
  }
  yield put(setFinish());
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

function* watchSignup() {
  yield takeEvery(types.SIGNUP, signupUser);
}

function* watchActivate() {
  yield takeEvery(types.ACTIVATE, activateUser);
}

export default function* currentUserSaga() {
  yield all([
    watchLogin(),
    watchFetchUser(),
    watchLogout(),
    watchForgotPassword(),
    watchResetPassword(),
    watchSignup(),
    watchActivate(),
  ]);
}
