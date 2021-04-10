import * as types from '../types/globalLoading';

export const setLoading = () => {
  return { type: types.LOADING };
};

export const setFinish = () => {
  return { type: types.FINISH };
};
