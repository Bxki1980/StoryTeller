import React from 'react'
import { View, Text } from 'react-native'
import AuthInput from '../../components/AuthInput'
import AuthButton from '../../components/AuthButton'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  return (
    <SafeAreaView className='flex-1 '>
    <View className='flex-1 item-center justify-center bg-blue p-25'>
      <AuthInput label='email'/>
      <AuthInput label='password'/>
      <AuthButton title='Login' onPress={() => {}} isLoading = {false}/>
    </View>  
    </SafeAreaView>
  );
}
