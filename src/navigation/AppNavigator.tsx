import HomeScreen from '~/screens/main/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '~/components/common/BottomTabNavigator';
import BookDetailScreen from '~/screens/library/bookDetail/BookDetailScreen';
import ProfileScreen from '~/screens/main/ProfileScreen';
import type { RootStackParamList } from '~/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

console.log('✅ AppNavigator mounted');

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
