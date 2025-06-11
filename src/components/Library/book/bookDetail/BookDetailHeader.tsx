import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  author: string;
  ageRange: string;
  onBackPress: () => void;
  onBookmarkPress?: () => void;
  isBookmarked?: boolean;
}

export default function BookDetailHeader({
  title,
  author,
  ageRange,
  onBackPress,
  onBookmarkPress,
  isBookmarked = false,
}: Props) {
  return (
    <View className="px-4 pt-3 pb-4 bg-white shadow-sm flex-row justify-between items-start">
      {/* Left: Back + Info */}
      <View className="flex-1">
        <TouchableOpacity onPress={onBackPress} className="mb-2">
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-600 mt-0.5">by {author}</Text>
        <Text className="text-xs text-indigo-500 mt-1">For Ages: {ageRange}</Text>
      </View>

      {/* Right: Optional Bookmark */}
      {onBookmarkPress && (
        <TouchableOpacity onPress={onBookmarkPress} className="ml-2 mt-1">
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isBookmarked ? '#6366f1' : '#9ca3af'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
