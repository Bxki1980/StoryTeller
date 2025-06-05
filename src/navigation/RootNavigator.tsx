import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '~/hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import LoadingScreen from '~/screens/common/LoadingScreen';
import { useEffect } from 'react';

export default function RootNavigator() {
  const { isAuthenticated, isFirstLaunch, isLoading } = useAuth();

  useEffect(() => {
    console.log('🔁 RootNavigator re-evaluated');
    console.log('🧠 Auth status:', { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);


  
  if (isLoading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator isFirstLaunch={isFirstLaunch} />
      )}
    </NavigationContainer>
  );
}
