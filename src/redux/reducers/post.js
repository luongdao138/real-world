import { initState } from '../initState';
import * as types from '../types/post';
import { LOGIN_SUCCESS } from '../types/currentUser';

const postReducer = (state = initState.post, action) => {
  switch (action.type) {
    case types.LOAD_POST_SUCCESS:
      return {
        ...state,
        item: action.payload.post,
        isOwn: action.payload.isOwn,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isOwn:
          state.item.creator &&
          action.payload.user._id === state.item.creator._id
            ? true
            : false,
      };
    case types.LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          items: action.payload,
          current: action.payload.length,
        },
      };
    case types.LOAD_COUNT_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          total: action.payload,
        },
      };
    case types.POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          current: state.comments.current + 1,
          total: state.comments.total + 1,
          items: [action.payload, ...state.comments.items],
        },
      };
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          current: state.comments.current - 1,
          total: state.comments.total - 1,
          items: state.comments.items.filter(
            (item) => item._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default postReducer;
