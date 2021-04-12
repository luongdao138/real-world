import * as types from '../types/post';

export const loadPost = (id) => {
  return { type: types.LOAD_POST, payload: id };
};

export const loadPostSuccess = (post, isOwn) => {
  return { type: types.LOAD_POST_SUCCESS, payload: { post, isOwn } };
};

export const loadCommentsSuccess = (comments) => {
  return { type: types.LOAD_COMMENTS_SUCCESS, payload: comments };
};

export const loadMoreComment = (id, limit) => {
  return { type: types.LOAD_MORE_COMMENTS, payload: { id, limit } };
};

export const loadCountComments = (total) => {
  return { type: types.LOAD_COUNT_COMMENTS_SUCCESS, payload: total };
};

export const postComment = (comment, id, token) => {
  return { type: types.POST_COMMENT, payload: { comment, id, token } };
};

export const postCommentSuccess = (comment) => {
  return { type: types.POST_COMMENT_SUCCESS, payload: comment };
};

export const deleteComment = (id, token) => {
  return { type: types.DELETE_COMMENT, payload: { id, token } };
};

export const deleteCommentSuccess = (id) => {
  return { type: types.DELETE_COMMENT_SUCCESS, payload: id };
};
