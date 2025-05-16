import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ParamListBase } from '@react-navigation/native';

interface AuthStackParamList extends ParamListBase {
  Welcome: undefined;
  SignIn: undefined;
  login: undefined;
} 




export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 justify-center items-center bg-white'>
            <Text className='text-3xl font-bold text-center mt-10'>
                Welcome to Story Teller
            </Text>
            <Text className='text-center mt-5'>
                A place where you can share your stories and read others
            </Text>
            <Image
                source={require('../../assets/images/js.jpeg')}
                className='w-full h-1/2 mt-10'
                resizeMode='contain'
            ></Image>
            <View className='rounded-full bg-blue-500 w-1/2 h-12 justify-center items-center mt-10'>
              <Button  title='Get Started!' onPress={() => {}} ></Button>
            </View>
            <View className='flex-row mt-5'>
                <Text className='text-gray-500'>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}> 
                <Text className='text-blue-500 font-semibold'> login!</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}
