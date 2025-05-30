import React from 'react';
import { Pressable, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useGoogleLogin } from '~/hooks/useGoogleLogin'; // We'll define this below

interface GoogleSignUpButtonProps {
  label?: string;
}

export default function GoogleSignUpButton({ label = 'Sign up with Google' }: GoogleSignUpButtonProps) {
  const { signInWithGoogle, isLoading } = useGoogleLogin();

  return (
    <View className="w-full mt-4">
      <Pressable
        onPress={signInWithGoogle}
        disabled={isLoading}
        className="flex-row items-center justify-center bg-white py-3 px-5 rounded-xl border border-gray-300 shadow-md active:opacity-80"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color="#EA4335" className="mr-2" />
            <Text className="text-base text-black font-medium">{label}</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
