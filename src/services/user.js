import axios from 'axios';

const baseUrl = '/api/v1/users';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${baseUrl}/login`,
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
