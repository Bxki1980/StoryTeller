import React from 'react';
import { View, Text, ImageBackground, TextInputProps, Dimensions } from 'react-native';

interface AuthHeaderProps extends TextInputProps {
  title: string;
  description: string;
  imagePath: any; // Use `require(...)` when passing
}

const screenHeight = Dimensions.get('window').height;

export default function AuthHeader({ title, description, imagePath }: AuthHeaderProps) {
  return (
    <View>
      {/* Image as Background */}
      <ImageBackground
        source={imagePath}
        resizeMode="cover"
        style={{ height: screenHeight * 0.4 }}
        className="w-full justify-end px-6 pb-10">
        <Text className="mb-2 text-center text-3xl font-bold text-white">{title}</Text>
        <Text className="text-center text-base text-white ">{description}</Text>
      </ImageBackground>
    </View>
  );
}
