import axios from 'axios';

export const loadGlobalPost = (page, limit) => {
  try {
    const res = axios.get(
      `https://real-world-app-v1.herokuapp.com/api/v1/posts?page=${page}&limit=${limit}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getGlobalPostCount = () => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/count`
  );
};

export const loadPersonalPost = (page, limit, token) => {
  try {
    const res = axios({
      url: `https://real-world-app-v1.herokuapp.com/api/v1/posts/follow?page=${page}&limit=${limit}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getPersonalPostCount = (token) => {
  return axios.get(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/follow/count`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateLike = (id, token) => {
  return axios.put(
    `https://real-world-app-v1.herokuapp.com/api/v1/posts/favorite/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
