import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import ProfileAvatar from '~/components/profile/ProfileAvatar';
import ProfileInfo from '~/components/profile/ProfileInfo';
import ProfileActions from '~/components/profile/ProfileActions';
import { useAuth } from '~/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    // TODO: Implement navigation to edit screen or show modal
    console.log('Edit Profile Pressed');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
        <ProfileAvatar
          name={`${user?.given_name ?? 'Guest'} ${user?.family_name ?? ''}`}
          avatarUrl={user?.picture ?? 'https://via.placeholder.com/150'}
        />
        <ProfileInfo
          email={user?.email ?? 'Not Available'}
          role={user?.role ?? 'Free'}
        />
        <ProfileActions
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
