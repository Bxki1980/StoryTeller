import React from 'react'
import { View, Image, Text} from 'react-native';

interface Props {
    name: string;
    avatarUrl: string;
}

export default function ProfileAvatar({ name, avatarUrl }: Props) {
  return (
    <View className='item-center mb-4'>
        <Image
        source={{ uri: avatarUrl}}
        className='w-24 h-24 rounded-full mb-2 border-2 border-white shadow'
        />
        <Text className='text-xl font-semibold text-gray-500'></Text>
    </View>    
  )
}
