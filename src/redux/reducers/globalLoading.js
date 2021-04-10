import { initState } from '../initState';
import * as types from '../types/globalLoading';

const globalLoadingReducers = (state = initState.globalLoading, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.FINISH:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default globalLoadingReducers;
