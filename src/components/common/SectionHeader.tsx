import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View className="my-4 px-1">
      <Text className="text-lg font-bold text-gray-900">
        {title}
      </Text>
    </View>
  );
}
