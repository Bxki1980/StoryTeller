import React from 'react'
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { AuthContext } from '~/context/AuthContext'
import { useContext } from 'react'
import WelcomeScreen from '~/screens/auth/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import LoadingScreen from '~/screens/common/LoadingScreen'
import { useAuth } from '~/hooks/useAuth'




const Stack = createNativeStackNavigator()

export default function RootNavigator() {
    const {userToken , isFirstLaunch, isLoading} = useAuth();

    if (isLoading) return <LoadingScreen/>


  return (
    <NavigationContainer>
        {userToken ? <AppNavigator /> : <AuthNavigator isFirstLaunch={isFirstLaunch} />}
    </NavigationContainer>
  )
}
