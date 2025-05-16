import React from 'react'
import LoginScreen from '~/screens/auth/LoginScreen'
import SignupScreen from '~/screens/auth/SignupScreen'
import ForgotPassword from '~/screens/auth/ForgotPassword'
import WelcomeScreen from '~/screens/auth/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Header } from 'react-native/Libraries/NewAppScreen'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={
        {
            headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
  )
}
