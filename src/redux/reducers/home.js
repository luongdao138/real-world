import { initState } from '../initState';
import * as postListTypes from '../types/postList';

const homeReducer = (state = initState.home, action) => {
  switch (action.type) {
    case postListTypes.LOAD_GLOBAL_POST_SUCCESS:
      return { ...state, currentTab: 'global' };
    case postListTypes.LOAD_PERSONAL_POST_SUCCESS:
      return { ...state, currentTab: 'personal' };
    default:
      return state;
  }
};

export default homeReducer;
