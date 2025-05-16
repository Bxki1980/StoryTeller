import React from 'react'
import { View, Text } from 'react-native'
import AuthInput from '../../components/AuthInput'
import AuthButton from '../../components/AuthButton'

export default function LoginScreen() {
  return (
    <View>
      <AuthInput label='email'/>
      <AuthInput label='password'/>
      <AuthButton title='' onPress={() => {}} isLoading = {false}/>
    </View>  
  );
}
