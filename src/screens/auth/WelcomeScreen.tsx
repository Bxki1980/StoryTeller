import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="mt-10 text-center text-3xl font-bold">Welcome to Story Teller</Text>
        <Text className="mt-5 text-center">
          A place where you can share your stories and read others
        </Text>
        <Image
          source={require('../../assets/images/auth/js.jpeg')}
          className="mt-10 h-1/2 w-full"
          resizeMode="contain"></Image>
        <TouchableOpacity
          onPress={() =>  navigation.navigate('auth')}
          className="mt-10 h-12 w-1/2 items-center justify-center rounded-full bg-blue-500 shadow-md">
          <Text className="text-base font-bold uppercase text-white">Get Started!</Text>
        </TouchableOpacity>
        <View className="mt-5 flex-row">
          <Text className="text-gray-500">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('auth', { screen: 'AuthScreen' })}>
            <Text className="font-semibold text-blue-500"> login!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
