import * as types from '../types/postList';

export const reset = () => {
  return { type: types.RESET };
};

export const loadGlobalPost = (page, limit) => {
  return { type: types.LOAD_GLOBAL_POST, payload: { page, limit } };
};

export const loadPersonalPost = (page, limit, token) => {
  return { type: types.LOAD_PERSONAL_POST, payload: { page, limit, token } };
};

export const loadGlobalPostSuccess = (page, postCount, data) => {
  return {
    type: types.LOAD_GLOBAL_POST_SUCCESS,
    payload: { items: data, postCount, page },
  };
};

export const loadPersonalPostSuccess = (page, postCount, data) => {
  return {
    type: types.LOAD_PERSONAL_POST_SUCCESS,
    payload: { items: data, postCount, page },
  };
};

export const updateLike = (id, token) => {
  return {
    type: types.UPDATE_LIKE,
    payload: { id, token },
  };
};

export const updateLikeSuccess = (id, message) => {
  return { type: types.UPDATE_LIKE_SUCCESS, payload: { id, message } };
};

export const addPost = (post, token, history) => {
  return {
    type: types.ADD_POST,
    payload: { post, token, history },
  };
};

export const addPostSuccess = (post) => {
  return { type: types.ADD_POST_SUCCESS, payload: post };
};
