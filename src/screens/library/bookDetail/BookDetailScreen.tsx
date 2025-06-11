import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useBookDetail } from '~/hooks/book/useBookDetail';

export default function BookDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { bookId } = route.params;

  const { book, loading, error } = useBookDetail(bookId);

  const handleStartReading = () => {
    navigation.navigate('PageScreen', { bookId: book?.id, sectionId: '001' });
  };

  if (loading) {
    return <ActivityIndicator className="mt-10" size="large" color="#6C63FF" />;
  }

  if (!book || error) {
    return <Text className="text-center mt-10 text-red-500">Failed to load book details.</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Image source={{ uri: book.coverImageUrl }} className="w-full h-80" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900">{book.title}</Text>
        <Text className="text-sm text-gray-500 mt-1">by {book.author}</Text>
        <Text className="text-sm text-indigo-500 mt-1">For Ages: {book.ageRange}</Text>

        <Text className="text-base text-gray-800 mt-4 leading-relaxed">{book.description}</Text>

        <TouchableOpacity
          onPress={handleStartReading}
          className="mt-6 bg-indigo-600 rounded-xl py-3 items-center"
        >
          <Text className="text-white font-semibold text-lg">Start Reading</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
