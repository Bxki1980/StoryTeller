import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';

import { useBooks } from '~/hooks/useBooks';
import SearchBar from '~/components/common/SearchBar';
import BookGrid from '~/components/Library/BookGrid';
import { Book } from '~/types/Book';

export default function LibraryScreen() {
  const { books, loading, error } = useBooks();
  const navigation = useNavigation();

  // Search logic
  const [rawInput, setRawInput] = useState('');
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useMemo(() => debounce((text: string) => setSearchText(text), 300), []);

  useEffect(() => () => debouncedSearch.cancel(), []);

  const handleSearchChange = (text: string) => {
    setRawInput(text);
    debouncedSearch(text);
  };

  const handleBookPress = (book: Book) => {
    // navigation.navigate('BookDetailScreen', { bookId: book.id });
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => book.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [books, searchText]);

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="mb-2 mt-6 text-center text-3xl font-bold">📚 Your Library</Text>

      <SearchBar
        value={rawInput}
        onChangeText={handleSearchChange}
        onClear={() => {
          setRawInput('');
          setSearchText('');
        }}
      />

      {loading ? (
        <ActivityIndicator className="mt-10" size="large" color="#6C63FF" />
      ) : error ? (
        <Text className="mt-10 text-center text-red-500">{error}</Text>
      ) : filteredBooks.length === 0 ? (
        <Text className="mt-10 text-center text-gray-500">No books found.</Text>
      ) : (
        <BookGrid books={filteredBooks} onBookPress={handleBookPress} />
      )}
    </View>
  );
}
