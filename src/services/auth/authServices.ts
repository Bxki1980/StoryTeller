import axiosInstance from '../../api/axiosInstance';
import {
  saveToSecureStore,
  getFromSecureStore,
  deleteFromSecureStore,
} from '../../storage/secureStorage';

export async function login(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await axiosInstance.post('/Auth/login', {
    email,
    password,
  });

  const { token: accessToken, refreshToken } = response.data.data;

  await saveToSecureStore('accessToken', accessToken);
  await saveToSecureStore('refreshToken', refreshToken);
  await saveToSecureStore('userEmail', email);

  return { accessToken, refreshToken };
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

export async function register(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; email: string }> {
  const response = await axiosInstance.post('/auth/register', {
    email,
    password,
  });

  const { token: accessToken, refreshToken, email: returnedEmail } = response.data.data;

  await saveToSecureStore('accessToken', String(accessToken));
  await saveToSecureStore('refreshToken', String(refreshToken));
  await saveToSecureStore('userEmail', String(returnedEmail));

  return { accessToken, refreshToken, email: returnedEmail };
}

export async function refreshToken() {
  const refreshToken = await getFromSecureStore('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axiosInstance.post('/auth/refresh', {
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

export async function googleLogin(idToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  email: string;
}> {
  const response = await axiosInstance.post('/GoogleLogin/google-signin-token', idToken, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { data } = response.data; // Assuming you're using ApiResponse<AuthResponseDto>
  return {
    accessToken: data.token,
    refreshToken: data.refreshToken,
    email: data.email,
  };
}
