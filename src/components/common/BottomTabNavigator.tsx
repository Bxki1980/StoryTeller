import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlaylistsScreen from '~/screens/main/PlaylistsScreen';
import LibraryScreen from '~/screens/library/LibraryScreen';
import ProfileScreen from '~/screens/main/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '~/screens/main/HomeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Playlists':
                iconName = 'musical-notes';
                break;
              case 'Library':
                iconName = 'library';
                break;
              case 'Profile':
                iconName = 'person';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="Playlists" component={PlaylistsScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
