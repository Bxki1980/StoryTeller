import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';



LogBox.ignoreLogs(['Warning: ...']); // optional
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log('💥 GLOBAL ERROR:', error);
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
