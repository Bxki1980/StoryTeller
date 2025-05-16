import React from 'react'
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function AuthInput({label, error}: AuthInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-sm font-semibold mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg p-3 ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={label}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={label.toLowerCase().includes('password')}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  )
}
