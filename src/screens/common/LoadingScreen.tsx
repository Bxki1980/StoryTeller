import React from 'react'
import {View, ActivityIndicator, Text, StatusBar} from 'react-native'

export default function LoadingScreen() {
  return (
    <View className='flex-1 item-center justify-center bg-white'>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ffffff"/>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className='mt-4 text-gray-700 text-lg font-semibold'>Preparing your experience...</Text>
    </View>
  )
}
