import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBookDetail } from '~/hooks/book/useBookDetail';
import BookDetailHeader from '~/components/Library/book/bookDetail/BookDetailHeader';

export default function BookDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { bookId } = route.params;

  const { book, loading, error } = useBookDetail(bookId);

  const handleStartReading = () => {
    // Navigate to the reading screen with the book ID
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!book || error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-lg text-red-500">Failed to load book details.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Cover Image */}
      <Image
        source={{ uri: book.coverImageUrl }}
        className="w-full h-80"
        resizeMode="cover"
      />

      {/* Header */}
      <BookDetailHeader
        title={book.title}
        author={book.author}
        ageRange={book.ageRange}
        onBackPress={() => navigation.goBack()}
        // Optional: Add bookmark toggle below
        // onBookmarkPress={() => toggleBookmark(book.id)}
        // isBookmarked={bookmarked}
      />

      {/* Description + Action */}
      <View className="px-5 pb-6">
        <Text className="text-base text-gray-800 leading-relaxed mt-2">
          {book.description}
        </Text>

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
