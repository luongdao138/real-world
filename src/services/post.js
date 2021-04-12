import axios from 'axios';

export const getPost = (id) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/${id}`
  );
};

export const getComments = (id, limit) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/comments/byPost/${id}?limit=${limit}`
  );
};

export const countComments = (id) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/comments/byPost/${id}/count`
  );
};

export const postComment = (comment, id, token) => {
  return axios.post(
    `https://real-world-app-v1.herokuapp.com/api/v1/comments/${id}`,
    comment,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteComment = (id, token) => {
  return axios.delete(
    `https://real-world-app-v1.herokuapp.com/api/v1/comments/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
