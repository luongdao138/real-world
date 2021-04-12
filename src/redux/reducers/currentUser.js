import { initState } from '../initState';
import * as types from '../types/currentUser';
import { UNFOLLOW_SUCCESS, FOLLOW_SUCCESS } from '../types/user';

const currentUserReducer = (state = initState.currentUser, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        info: action.payload.user,
        token: action.payload.token,
        errorMessage: '',
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.LOGOUT_SUCCESS:
      return { ...initState.currentUser, token: '' };
    case types.FORGOT_PW_SUCCESS:
      return {
        ...state,
        forgotPasswordMessage: action.payload,
        forgotPasswordError: '',
      };
    case types.FORGOT_PW_FAILURE:
      return {
        ...state,
        forgotPasswordError: action.payload,
        forgotPasswordMessage: '',
      };
    case types.RESET_PW_SUCCESS:
      return {
        ...state,
        resetPasswordMessage: action.payload,
        resetPasswordError: '',
      };
    case types.RESET_PW_FAILURE:
      return {
        ...state,
        resetPasswordError: action.payload,
        resetPasswordMessage: '',
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        signupMessage: action.payload,
        signupError: '',
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          follow: [...state.info.follow, action.payload],
        },
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          follow: state.info.follow.filter((x) => x !== action.payload),
        },
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        signupError: action.payload,
        signupMessage: '',
      };
    default:
      return state;
  }
};

export default currentUserReducer;
