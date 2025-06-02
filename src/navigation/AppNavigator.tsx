import HomeScreen from '~/screens/main/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
