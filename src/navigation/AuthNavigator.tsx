import React from 'react'
import LoginScreen from '~/screens/auth/LoginScreen'
import SignupScreen from '~/screens/auth/SignupScreen'
import ForgotPassword from '~/screens/auth/ForgotPassword'
import WelcomeScreen from '~/screens/auth/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function AuthNavigator({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  return (
    <Stack.Navigator screenOptions={
        {
            headerShown: false,
        }}>
              {isFirstLaunch && (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )}
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
  )
}
