import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface RecentlyPlayedCardProps {
  title: string;
  thumbnail: string; // URL or require()
  progress: number; // between 0 and 1
  storyId: string;
}

export default function RecentlyPlayedCard({
  title,
  thumbnail,
  progress,
  storyId,
}: RecentlyPlayedCardProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {}}
      className="w-40 mr-4 rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <Image
        source={typeof thumbnail === 'string' ? { uri: thumbnail } : thumbnail}
        className="h-32 w-full"
        resizeMode="cover"
      />

      <View className="p-2">
        <Text className="font-semibold text-sm text-gray-900" numberOfLines={1}>
          {title}
        </Text>

        {/* Progress Bar */}
        <View className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="bg-blue-500 h-full"
            style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
          />
        </View>

        <Text className="text-xs text-blue-400 font-medium mt-1">Continue Listening</Text>
      </View>
    </TouchableOpacity>
  );
}
