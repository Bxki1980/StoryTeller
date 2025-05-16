import React from 'react'
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { AuthContext } from '~/context/AuthContext'
import { useContext } from 'react'
import WelcomeScreen from '~/screens/auth/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
    const {user , isFirstLaunch, isLoading} = useContext(AuthContext);

    //if (isLoading) return <LoadingScreen/>

    if (isFirstLaunch) return <WelcomeScreen/>

  return (
    <NavigationContainer>
        {user ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
  )
}
