import * as types from '../types/user';

export const loadUserInfo = (id) => {
  return { type: types.LOAD_USER_INFO, payload: id };
};

export const loadUserInfoSuccess = (info) => {
  return { type: types.LOAD_USER_INFO_SUCCESS, payload: info };
};

export const loadPersonalPosts = (id) => {
  return { type: types.LOAD_OWN_POST, payload: id };
};

export const loadPersonalPostsSuccess = (info) => {
  return { type: types.LOAD_OWN_POST_SUCCESS, payload: info };
};

export const loadFavoritePosts = (id) => {
  return { type: types.LOAD_FAVORITE_POST, payload: id };
};

export const loadFavoritePostsSuccess = (info) => {
  return { type: types.LOAD_FAVORITE_POST_SUCCESS, payload: info };
};

export const follow = (id, token) => {
  return { type: types.FOLLOW, payload: { id, token } };
};

export const unfollow = (id, token) => {
  return { type: types.UNFOLLOW, payload: { id, token } };
};

export const followSuccess = (id) => {
  return { type: types.FOLLOW_SUCCESS, payload: id };
};

export const unfollowSuccess = (id) => {
  return { type: types.UNFOLLOW_SUCCESS, payload: id };
};
