import { saveToSecureStore } from '~/storage/secureStorage';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import axiosInstance from '~/api/axiosInstance';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



export const loginWithGoogleIdToken = async (idToken: string) => {
  try {
    const response = await axiosInstance.post(
      '/GoogleLogin/google-signin-token',
      idToken,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const { token, refreshToken } = response.data;
    await saveToSecureStore('accessToken', token);
    await saveToSecureStore('refreshToken', refreshToken);
  } catch (err) {
    console.error("Google login failed", err);
  }
};
