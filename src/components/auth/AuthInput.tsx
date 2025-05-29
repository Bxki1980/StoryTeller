import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function AuthInput({
  label,
  error,
  value,
  onChangeText,
  secureTextEntry,
}: AuthInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-gray-100">{label}</Text>
      <TextInput
        className={`rounded-lg border p-3 ${error ? 'border-red-500' : 'border-gray-100'}`}
        placeholder={label}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
}
