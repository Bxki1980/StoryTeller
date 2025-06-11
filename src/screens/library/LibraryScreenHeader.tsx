import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  username?: string;
  avatarUrl?: string;
  onSettingsPress?: () => void;
}

export default function LibraryScreenHeader({
  username = 'Guest',
  avatarUrl = 'https://via.placeholder.com/100',
  onSettingsPress,
}: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-6 pb-3 bg-white shadow-sm">
      {/* Left: Greeting + Title */}
      <View>
        <Text className="text-xl font-bold text-gray-800">📚 Your Library</Text>
        <Text className="text-sm text-gray-500 mt-1">Hello, {username}! 👋</Text>
      </View>

      {/* Right: Settings + Avatar */}
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={22} color="#6b7280" />
        </TouchableOpacity>

        <Image
          source={{ uri: avatarUrl }}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </View>
    </View>
  );
}
