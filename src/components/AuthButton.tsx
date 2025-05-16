import React from 'react'
import { Text, Pressable, PressableProps } from 'react-native';

interface AuthButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  onPress: () => void;
}

export default function AuthButton({title, isLoading, onPress}: AuthButtonProps) {
  return (
    <Pressable className="bg-blue-600 py-3 px-6 rounded-xl items-center justify-center active:bg-blue-700 disabled:opacity-50"
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <Text className="text-white">Loading...</Text>
      ) : (
        <Text className="text-white text-lg font-semibold">{title}</Text>
      )}
    </Pressable>
  )
}
