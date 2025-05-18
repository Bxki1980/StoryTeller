import React from 'react'
import { View, Text } from 'react-native'
import AuthInput from '../../components/AuthInput'
import AuthButton from '../../components/AuthButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthHeader from '~/components/AuthHeader'

export default function LoginScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
    <View className='flex-1 justify-center '>
      <AuthHeader
      title="Welcome Back!"
      description="Please login to your account"
      imagePath={require('../../assets/images/auth/login-illustration.png')}
      />
      <AuthInput label='email'/>
      <AuthInput label='password'/>
      <AuthButton title='Login' onPress={() => {}} isLoading = {false}/>
    </View>  
    </SafeAreaView>
  );
}
