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

export const logout = () => {
  return { type: types.LOGOUT };
};

export const logoutSuccess = () => {
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
