import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBookDetail } from '~/hooks/book/useBookDetail';
import { useBookPages } from '~/hooks/book/useBookPages';
import BookDetailHeader from '~/components/Library/book/bookDetail/BookDetailHeader';
import { Page } from '~/types/Book/Page';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';

export default function BookDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookId } = route.params;

  const { book, loading: bookLoading, error } = useBookDetail(bookId);
  const {
    pages,
    fetchPages,
    isLoading: pagesLoading,
    hasMore,
  } = useBookPages(bookId);

  useEffect(() => {
    fetchPages(); // initial page load
  }, [fetchPages]);

  const handleStartReading = () => {
    if (!book) return;
      navigation.navigate('StartReadingScreen', { bookId });
  };

  if (!bookId) { 
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-lg text-red-500">Invalid book ID.</Text>
      </SafeAreaView>
    );
  }

  if (bookLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#6C63FF" />
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

  const renderPageCard = ({ item }: { item: Page }) => (
    <View className="mb-4 p-4 mx-4 rounded-xl bg-gray-100">
      <Text className="text-sm font-semibold text-indigo-700 mb-2">{item.sectionId}</Text>
      <Text className="text-base text-gray-800">{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        ListHeaderComponent={
          <>
            {/* Cover */}
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

            {/* Description */}
            <View className="px-5 pb-4">
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

              <Text className="mt-8 mb-2 text-lg font-semibold text-gray-700">Pages</Text>
            </View>
          </>
        }
        data={pages}
        keyExtractor={(item) => item.sectionId}
        renderItem={renderPageCard}
        onEndReached={() => {
          if (hasMore && !pagesLoading) fetchPages();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          pagesLoading ? (
            <ActivityIndicator className="my-4" />
          ) : !hasMore ? (
            <Text className="text-center text-gray-400 py-6">No more pages</Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
