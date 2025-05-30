import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInput from '~/components/auth/AuthInput';
import AuthButton from '~/components/auth/AuthButton';
import AuthToggle from '~/components/auth/AuthToggle';
import { useAuth } from '~/hooks/useAuth';
import * as AuthService from '../../services/authServices';
import { Alert } from 'react-native';

type AuthTab = 'login' | 'signup' | 'forgotPassword';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const { accessToken, refreshToken } = await AuthService.login(email, password);

      await login(accessToken, refreshToken, email);
    } catch (err: any) {
      Alert.alert('Login Failed', err.response?.data?.message || err.message);
    }
  };

  const handleRegister = async () => {
  if (!email || !password || !confirmPassword || password !== confirmPassword) {
    Alert.alert('Validation Error', 'Please check your fields.');
    return;
  }

  try {
    const { accessToken, refreshToken } = await AuthService.register(
      email,
      password,
    );

    await login(accessToken, refreshToken, email);
  } catch (err: any) {
    Alert.alert('Register Failed', err.response?.data?.message || err.message);
  }
};

  const renderForm = () => {
    switch (activeTab) {
      case 'login':
        return (
          <>
            <AuthInput label="EMAIL" value={email} onChangeText={setEmail} />
            <AuthInput
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() => setActiveTab('forgotPassword')}
              className="mb-8 self-end">
              <Text className="font-semibold text-blue-400 underline">Forgot Password?</Text>
            </TouchableOpacity>
            <AuthButton title="Login" onPress={handleLogin} isLoading={false} />
          </>
        );
      case 'signup':
        return (
          <>
            <AuthInput label="EMAIL" value={email} onChangeText={setEmail} />
            <AuthInput
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <AuthInput
              label="CONFIRM PASSWORD"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <AuthButton title="Sign up" onPress={() => {}} isLoading={false} />
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <AuthInput label="EMAIL" value={email} onChangeText={setEmail} />
            <TouchableOpacity onPress={() => setActiveTab('login')} className="mb-8 self-end">
              <Text className="font-semibold text-blue-400 underline ">Back to login?</Text>
            </TouchableOpacity>
            <AuthButton title="SEND RESET LINK" onPress={() => {}} isLoading={false} />
          </>
        );
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={require('../../assets/images/auth/login-illustration.png')}
        resizeMode="cover"
        className="flex-1 px-6 pt-6">
        <View className="absolute inset-0 bg-black opacity-50" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1 justify-center">
          <View className="flex-1 justify-center">
            <AuthToggle
              activeTab={activeTab === 'forgotPassword' ? 'login' : activeTab}
              setActiveTab={setActiveTab}
            />
            {renderForm()}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
