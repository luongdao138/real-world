import { initState } from '../initState';
import * as types from '../types/postList';

const postListReducer = (state = initState.postList, action) => {
  switch (action.type) {
    case types.RESET:
      return {
        ...state,
        currentPage: 1,
      };
    case types.LOAD_GLOBAL_POST_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        postCount: action.payload.postCount,
        currentPage: action.payload.page,
      };
    case types.LOAD_PERSONAL_POST_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        postCount: action.payload.postCount,
        currentPage: action.payload.page,
      };
    case types.UPDATE_LIKE_SUCCESS:
      const newItems = state.items.map((item) => {
        if (item._id !== action.payload.id) return item;
        else
          return action.payload.message === 'favorite'
            ? { ...item, likeCount: item.likeCount + 1 }
            : { ...item, likeCount: item.likeCount - 1 };
      });
      return {
        ...state,
        items: newItems,
      };
    case types.ADD_POST_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default postListReducer;
