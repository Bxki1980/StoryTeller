import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PlaylistCardProps {
  title: string;
  image: ImageSourcePropType;
  screen: string; // Screen name to navigate to
}

export default function PlaylistCard({ title, image, screen }: PlaylistCardProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen as never)}
      className="w-[48%] h-28 bg-white rounded-2xl overflow-hidden shadow-sm mb-4"
    >
      <Image source={image} resizeMode="cover" className="absolute w-full h-full" />

      {/* Overlay for contrast */}
      <View className="absolute inset-0 bg-black opacity-20" />

      {/* Content */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-white font-bold text-base drop-shadow-md">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
