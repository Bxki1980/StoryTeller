import React from 'react';
import WelcomeScreen from '~/screens/auth/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '~/screens/auth/AuthScreen';

console.log('🔐 AuthNavigator mounted');

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Welcome' : 'auth'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
