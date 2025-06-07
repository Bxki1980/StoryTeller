import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

interface Props {
  onEditProfile: () => void;
  onLogout: () => void;
}

export default function ProfileActions({ onEditProfile, onLogout }: Props) {
  return (
    <View className="w-full mt-6">
      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl mb-4"
        onPress={onEditProfile}
      >
        <Text className="text-white text-center font-semibold">Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 py-3 rounded-xl"
        onPress={onLogout}
      >
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
