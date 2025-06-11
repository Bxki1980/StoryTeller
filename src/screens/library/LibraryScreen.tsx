import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';
import { useBooks } from '~/hooks/book/useBooks';
import SearchBar from '~/components/common/SearchBar';
import BookGrid from '~/components/Library/BookGrid';
import { BookCover } from '~/types/Book/BookCover';
import LoadingIndicator from '~/components/common/LoadingIndicator';
import LibraryScreenHeader from '~/screens/library/LibraryScreenHeader';
import { useAuth } from '~/hooks/auth/useAuth';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';


const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export default function LibraryScreen() {
  const { books, loading, error } = useBooks();
  const { user } = useAuth()

  // Search logic
  const [rawInput, setRawInput] = useState('');
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useMemo(() => debounce((text: string) => setSearchText(text), 300), []);

  useEffect(() => () => debouncedSearch.cancel(), []);

  const handleSearchChange = (text: string) => {
    setRawInput(text);
    debouncedSearch(text);
  };

  const handleBookPress = (bookCover: BookCover) => {
    // navigation.navigate('BookDetailScreen', { bookId: book.id });
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => book.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [books, searchText]);

  return (
    <View className="flex-1 bg-gray-100">
      <LibraryScreenHeader
        username={user?.given_name ?? 'Guest'}
        avatarUrl={user?.picture ?? 'https://via.placeholder.com/100'}
        onSettingsPress={() => navigation.navigate('ProfileScreen')}
      />

      <SearchBar
        value={rawInput}
        onChangeText={handleSearchChange}
        onClear={() => {
          setRawInput('');
          setSearchText('');
        }}
      />

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Text className="mt-10 text-center text-red-500">{error}</Text>
      ) : filteredBooks.length === 0 ? (
        <Text className="mt-10 text-center text-gray-500">No books found.</Text>
      ) : (
        <BookGrid booksCover={filteredBooks} onBookPress={handleBookPress} />
      )}
    </View>
  );
}
