import React from 'react'
import {View, ActivityIndicator, Text} from 'react-native'

export default function LoadingIndicator() {
  return (
    <View className='flex-1 item-center justify-center bg-white'>
      <ActivityIndicator size="large" color="#4f46e5"/>
      <Text className='mt-3 text-gray text-base'>Loading....</Text>
    </View>
  )
}
