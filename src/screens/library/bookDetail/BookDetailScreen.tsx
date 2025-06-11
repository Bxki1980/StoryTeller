import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBookDetail } from '~/hooks/book/useBookDetail';
import BookDetailHeader from '~/components/Library/book/bookDetail/BookDetailHeader';
import { BookDetail } from '~/types/Book/BookDetail';

export default function BookDetailScreen() {


  const navigation = useNavigation();
  const route = useRoute<any>();
  const { bookId } = route.params;

  const { book, loading, error } = useBookDetail(bookId);

  const handleStartReading = () => {
    if (!book) return;
    // TODO: Navigate to reading screen with book.id
    console.log('Starting to read book:', book.bookId );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#6C63FF" />
      </SafeAreaView>
    );
  }

  if (!bookId) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-center text-lg text-red-500">Invalid book ID.</Text>
    </SafeAreaView>
  );
}

  if (!book || error) {
      console.log('❌ Book is null:', book, 'Error:', error);
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-lg text-center text-red-600 font-semibold">
          Failed to load book details.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
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
        />

        {/* Description & Button */}
        <View className="px-5 pb-10">
          <Text className="text-base leading-relaxed text-gray-800 mt-2">
            {book.description}
          </Text>

          <TouchableOpacity
            onPress={handleStartReading}
            className="mt-6 bg-indigo-600 rounded-xl py-3 items-center active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel={`Start reading ${book.title}`}
          >
            <Text className="text-white font-semibold text-lg">Start Reading</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
