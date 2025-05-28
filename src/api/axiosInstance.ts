import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
getFromSecureStore,
saveToSecureStore,
deleteFromSecureStore, } from '~/storage/secureStorage';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5224/api',
});


//Before any request is sent, read the access token from AsyncStorage and add it to the headers.
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getFromSecureStore('accessToken');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});


/* 
If we receive a 401 Unauthorized response:
Call the refresh token API
Get new access token
Retry the failed request
*/

axiosInstance.interceptors.response.use(
  (response) => response,  // If response is OK, just return it
  async (error) => {
    const originalRequest = error.config;

    // If token expired AND we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getFromSecureStore('refreshToken');

      try {
        const res = await axios.post('http://localhost:5224/api/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken } = res.data;

        await saveToSecureStore('accessToken', accessToken);

        // Update Axios headers globally and for this request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest); // Retry the failed request
      } catch (refreshError) {
        await Promise.all([
        deleteFromSecureStore('accessToken'),
        deleteFromSecureStore('refreshToken'),
        ]);
        return Promise.reject(refreshError); // Force logout later
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;