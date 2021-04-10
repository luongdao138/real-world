import axios from 'axios';

const baseUrl = 'https://real-world-app-v1.herokuapp.com/api/v1/users';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `https://real-world-app-v1.herokuapp.com/api/v1/users/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserLoginByToken = async (token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${baseUrl}/getByToken`,
      data: { token },
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (email) => {
  try {
    const res = axios.post(
      `${baseUrl}/forgotPassword`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (token, newPassword) => {
  try {
    const res = axios.put(
      `${baseUrl}/resetPassword`,
      { resetLink: token, newPassword },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const signup = (user) => {
  try {
    const res = axios.post(
      'https://real-world-app-v1.herokuapp.com/api/v1/users/register',
      user,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const activate = (token) => {
  try {
    const res = axios({
      url: 'https://real-world-app-v1.herokuapp.com/api/v1/users/activate',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
