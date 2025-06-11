import React from 'react';
import { useAuth } from '~/hooks/auth/useAuth';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Header() {

  return (
    <View className="flex-row justify-between items-center my-4">
      <TouchableOpacity className="rounded-s-full bg-gray-100 p-2">
        <Feather name="settings" size={20} />
      </TouchableOpacity>
      <Text className="text-2xl font-bold">Hello, {"user"}!</Text>
      <TouchableOpacity className="rounded-s-full bg-gray-100 p-2">
        <Feather name="smile" size={20} />
      </TouchableOpacity>
    </View>
  );
}
