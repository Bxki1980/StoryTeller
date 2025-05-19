import React from 'react';
import { Text, Pressable, PressableProps, View } from 'react-native';

interface AuthButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
}

export default function AuthButton({ title, isLoading, onPress }: AuthButtonProps) {
  return (
    <View className="mx-8 mt-4">
      <Pressable
        className="items-center justify-center rounded-xl bg-blue-600 px-6 py-3 active:bg-blue-700 disabled:opacity-50"
        onPress={onPress}
        disabled={isLoading}>
        {isLoading ? (
          <Text className="text-white">Loading...</Text>
        ) : (
          <Text className="text-lg font-semibold text-white">{title}</Text>
        )}
      </Pressable>
    </View>
  );
}
