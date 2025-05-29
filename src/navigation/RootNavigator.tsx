import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import LoadingScreen from '~/screens/common/LoadingScreen';
import { useAuth } from '~/hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { accessToken, isFirstLaunch, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <NavigationContainer key={accessToken ? 'app' : 'auth '}>
      {accessToken ? <AppNavigator /> : <AuthNavigator isFirstLaunch={isFirstLaunch} />}
    </NavigationContainer>
  );
}
