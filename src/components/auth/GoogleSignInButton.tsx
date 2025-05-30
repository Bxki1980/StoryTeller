import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from '~/hooks/useAuth';
import * as AuthService from '~/services/authServices';
import  GoogleLogo from 'lucide-react-native'; // use a matching icon library or replace

export default function GoogleSignInButton() {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.idToken;
      if (!idToken) throw new Error('No ID token received');

      const { accessToken, refreshToken, email } = await AuthService.googleLogin(idToken);
      await login(accessToken, refreshToken, email);
    } catch (error: any) {
      Alert.alert('Google Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleLogin}
      className="flex-row items-center justify-center rounded-lg bg-white py-3 shadow-md"
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View className="flex-row items-center gap-2">
          <GoogleLogo size={20} color="black" />
          <Text className="text-sm font-semibold text-black">Continue with Google</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
