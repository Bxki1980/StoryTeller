import React from 'react'
import { Text, Image,View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native'

const Navaigate= 

export default function WelcomeScreen() {
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
        </View>
    </SafeAreaView>
  )
}
