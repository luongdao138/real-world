import { initState } from '../initState';
import * as types from '../types/user';
import { LOGIN_SUCCESS } from '../types/currentUser';
import { UPDATE_LIKE_SUCCESS } from '../types/postList';

const userReducer = (state = initState.user, action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS:
      return { ...state, ...action.payload };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isOwn:
          state.info._id && action.payload.user._id === state.info._id
            ? true
            : false,
      };
    case UPDATE_LIKE_SUCCESS:
      if (action.payload.message === 'favorite')
        return {
          ...state,
          favoritePosts: state.favoritePosts.map((p) =>
            p._id === action.payload.id
              ? { ...p, likeCount: p.likeCount + 1 }
              : p
          ),
          posts: state.posts.map((p) =>
            p._id === action.payload.id
              ? { ...p, likeCount: p.likeCount + 1 }
              : p
          ),
        };
      else
        return {
          ...state,
          favoritePosts: state.favoritePosts.map((p) =>
            p._id === action.payload.id
              ? { ...p, likeCount: p.likeCount - 1 }
              : p
          ),
          posts: state.posts.map((p) =>
            p._id === action.payload.id
              ? { ...p, likeCount: p.likeCount - 1 }
              : p
          ),
        };
    case types.LOAD_OWN_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.LOAD_FAVORITE_POST_SUCCESS:
      return {
        ...state,
        favoritePosts: action.payload,
      };
    case types.FOLLOW_SUCCESS:
      return {
        ...state,
        isFollowed: true,
      };
    case types.UNFOLLOW_SUCCESS:
      return {
        ...state,
        isFollowed: false,
      };
    case 'LOGOUT_SUCCESS':
      return initState.user;

    default:
      return state;
  }
};

export default userReducer;
