import axios from 'axios';

export const loadUserInfo = (id) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/users/${id}`
  );
};

export const loadUserDetail = (id) => {
  // get posts posted by this user
  // get favorite posted of this user
  // get the followers of this user
  // get the following users of this user

  const getPosts = axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/byAuthor/${id}`
  );

  const getFavoritePost = axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/favorited/${id}`
  );

  const getFollowers = axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/users/followers/${id}`
  );

  const getFollowing = axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/users/follow/${id}`
  );

  return Promise.all([getPosts, getFavoritePost, getFollowers, getFollowing]);
};

export const getPersonalPosts = (id) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/byAuthor/${id}`
  );
};

export const getFavoritePosts = (id) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/favorited/${id}`
  );
};

export const follow = (id, token) => {
  return axios.put(
    `https://real-world-app-v1.herokuapp.com/api/v1/users/follow/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const unfollow = (id, token) => {
  return axios.put(
    `https://real-world-app-v1.herokuapp.com/api/v1/users/unfollow/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
