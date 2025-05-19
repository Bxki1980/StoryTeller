import React from 'react';
import { View, ActivityIndicator, Text, StatusBar } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="item-center flex-1 justify-center bg-white">
      <StatusBar barStyle={'dark-content'} backgroundColor="#ffffff" />
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text className="mt-4 text-lg font-semibold text-gray-700">Preparing your experience...</Text>
    </View>
  );
}
