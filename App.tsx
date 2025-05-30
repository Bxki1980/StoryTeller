import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '146989601159-65277rdh9cknsjesnqn2q94k0uiedrrp.apps.googleusercontent.com', 
});


export default function App() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
