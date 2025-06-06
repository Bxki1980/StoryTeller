import { View, Text } from 'react-native';
import React from 'react';

interface Props {
  email: string;
  role: string;
}

export default function ProfileInfo({ email, role }: Props) {
  return (
    <View className="bg-white rounded-xl shadow px-4 py-3 w-full">
      <Text className="text-gray-700">Email: <Text className="font-semibold">{email}</Text></Text>
      <Text className="text-gray-700 mt-2">Role: <Text className="font-semibold">{role}</Text></Text>
    </View>
  );
}
