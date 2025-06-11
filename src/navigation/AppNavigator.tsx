import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '~/components/common/BottomTabNavigator';

console.log('✅ AppNavigator mounted');

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
