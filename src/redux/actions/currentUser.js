import * as types from '../types/currentUser';

export const login = ({ email, password }) => {
  return {
    type: types.LOGIN,
    payload: { email, password },
  };
};

export const fetchUser = (token) => {
  return {
    type: types.FETCH_USER,
    payload: token,
  };
};

export const loginSuccess = ({ user, token }) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { user, token },
  };
};

export const loginFailure = (message) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: message,
  };
};

export const logout = (history) => {
  return { type: types.LOGOUT, payload: history };
};

export const logoutSuccess = (history) => {
  return { type: types.LOGOUT_SUCCESS };
};

export const forgotPassword = (email, history) => {
  return { type: types.FORGOT_PW, payload: { email, history } };
};

export const forgotPasswordSuccess = (message) => {
  return { type: types.FORGOT_PW_SUCCESS, payload: message };
};

export const forgotPasswordFailure = (message) => {
  return { type: types.FORGOT_PW_FAILURE, payload: message };
};

export const resetPassword = (payload) => {
  return { type: types.RESET_PW, payload };
};

export const resetPasswordSuccess = (message) => {
  return { type: types.RESET_PW_SUCCESS, payload: message };
};

export const resetPasswordFailure = (message) => {
  return { type: types.RESET_PW_FAILURE, payload: message };
};

export const signup = (user) => {
  return { type: types.SIGNUP, payload: user };
};

export const signupSuccess = (message) => {
  return { type: types.SIGNUP_SUCCESS, payload: message };
};

export const signupFailure = (message) => {
  return { type: types.SIGNUP_FAILURE, payload: message };
};

export const activate = (token) => {
  return { type: types.ACTIVATE, payload: token };
};

export const activateSuccess = (message) => {
  return { type: types.ACTIVATE_SUCCESS, payload: message };
};

export const activateFailure = (message) => {
  return { type: types.ACTIVATE_FAILURE, payload: message };
};
