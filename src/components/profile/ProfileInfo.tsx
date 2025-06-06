import React from 'react'
import { View, TouchableOpacity, Text, } from 'react-native';

interface Props {
    onEditProfile: () => void;
    onLogout: () => void;
}

export default function ProfileInfo({ onEditProfile, onLogout }: Props) {
  return (
    <View className='w-full mt-6'>
        <TouchableOpacity
        className='bg-blue-600 py-3 rounded-xl mb-4'
        onPress={onEditProfile}
        >
            <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text></Text>
        </TouchableOpacity>
    </View>
  )
}
