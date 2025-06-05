import HomeScreen from '~/screens/main/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


console.log('✅ AppNavigator mounted');

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
