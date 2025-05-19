import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingIndicator() {
  return (
    <View className="item-center flex-1 justify-center bg-white">
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text className="text-gray mt-3 text-base">Loading....</Text>
    </View>
  );
}
