import axiosInstance from '../api/axiosInstance';
import {
  saveToSecureStore,
  getFromSecureStore,
  deleteFromSecureStore,
} from '../storage/secureStorage';

export async function login(email: string, password: string) {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  const { accessToken, refreshToken } = response.data;

  await saveToSecureStore('accessToken', accessToken);
  await saveToSecureStore('refreshToken', refreshToken);
}

export async function logout() {
  const refreshToken = await getFromSecureStore('refreshToken');
  const email = await getFromSecureStore('userEmail');

  try {
    if (refreshToken && email) {
      await axiosInstance.post('/auth/logout', {
        email,
        refreshToken,
      });
    }
  } catch (err) {
    console.warn('Logout error:', err); // You may choose to ignore or log this
  }

  await Promise.all([
    deleteFromSecureStore('accessToken'),
    deleteFromSecureStore('refreshToken'),
    deleteFromSecureStore('userEmail'),
  ]);
}

export async function register(email: string, password: string, name: string) {
  return await axiosInstance.post('/auth/register', {
    email,
    password,
  });
}

export async function refreshToken() {
  const refreshToken = await getFromSecureStore('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axiosInstance.post('/auth/refresh-token', {
    refreshToken,
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

  await saveToSecureStore('accessToken', newAccessToken);

  // Some APIs return a new refresh token; if yours does, store it
  if (newRefreshToken) {
    await saveToSecureStore('refreshToken', newRefreshToken);
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
