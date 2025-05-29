import axios from 'axios';
import { getFromSecureStore, saveToSecureStore } from '~/storage/secureStorage';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:5224/api',
});

//Before any request is sent, read the access token from AsyncStorage and add it to the headers.
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getFromSecureStore('accessToken');

   console.log('📦 Sending request body to API:', config.data);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let logoutRef: (() => Promise<void>) | null = null;

export const setLogoutFunction = (fn: () => Promise<void>) => {
  logoutRef = fn;
};

export const getLogoutFunction = () => {
  if (!logoutRef) throw new Error('logout function not set');
  return logoutRef;
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/* 
If we receive a 401 Unauthorized response:
Call the refresh token API
Get new access token
Retry the failed request
*/
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await getFromSecureStore('refreshToken');
        if (!refreshToken) throw new Error('Missing refresh token');

        const response = await axios.post('/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken } = response.data;

        await saveToSecureStore('accessToken', accessToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // ❌ If refresh failed, log user out

        await getLogoutFunction()();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
