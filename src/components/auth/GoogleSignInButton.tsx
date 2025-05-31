import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '~/hooks/useAuth';
import * as AuthService from '~/services/auth/authServices';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '146989601159-65277rdh9cknsjesnqn2q94k0uiedrrp.apps.googleusercontent.com', // ✅ Use Web OAuth Client ID here
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true } as any),
  });

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success') {
        try {
          setLoading(true);
          const idToken = response.authentication?.idToken;
          if (!idToken) throw new Error('No ID token received');

          // ✅ Send token to your backend
          const { accessToken, refreshToken, email } = await AuthService.googleLogin(idToken);
          await login(accessToken, refreshToken, email);
        } catch (err: any) {
          Alert.alert('Google Login Failed', err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    handleGoogleResponse();
  }, [response]);

  return (
    <TouchableOpacity
      onPress={() => promptAsync()}
      className="mx-8 mt-4 flex-row items-center justify-center rounded-lg bg-white py-3 shadow-md"
      disabled={!request || loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#DB4437" />
      ) : (
        <View className="flex-row items-center gap-2">
          <Icon name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
          <Text className="text-sm font-semibold text-black">Continue with Google</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
