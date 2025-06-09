import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, onClear, placeholder }: Props) {
  return (
    <View className='flex-row item-center bg-white px-4 py-2 rounded-full shadow-md mx-4 my-2'>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
        className='flex-1 ml-2 text-base text-gray'
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        />
        {
            value.length > 0 && (
              <TouchableOpacity onPress={onClear}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )
        }
    </View>
  )
}
