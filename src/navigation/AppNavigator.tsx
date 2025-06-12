import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '~/components/common/BottomTabNavigator';
import BookDetailScreen from '~/screens/library/bookDetail/BookDetailScreen';
import ReadingScreen from '~/screens/library/bookDetail/ReadingScreen';
import LibraryScreen from '~/screens/library/LibraryScreen';
import ProfileScreen from '~/screens/main/ProfileScreen';

console.log('✅ AppNavigator mounted');

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="StartReadingScreen" component={ReadingScreen} />
    </Stack.Navigator>
  );
}
