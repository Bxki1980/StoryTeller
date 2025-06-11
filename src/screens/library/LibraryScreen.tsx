import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '~/components/common/SearchBar';
import BookGrid from '~/components/Library/BookGrid';
import { BookCover } from '~/types/Book/BookCover';
import LoadingIndicator from '~/components/common/LoadingIndicator';
import LibraryScreenHeader from '~/screens/library/LibraryScreenHeader';
import { useAuth } from '~/hooks/auth/useAuth';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '~/navigation/types';
import { useBooksCover } from '~/hooks/book/useBookCover';

export default function LibraryScreen() {
  const { booksCover, loading, error } = useBooksCover();

  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Search logic
  const [rawInput, setRawInput] = useState('');
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useMemo(() => debounce((text: string) => setSearchText(text), 300), []);

  useEffect(() => () => debouncedSearch.cancel(), []);

  const handleSearchChange = (text: string) => {
    setRawInput(text);
    debouncedSearch(text);
  };

  const handleBookPress = (book: BookCover) => {
    navigation.navigate('BookDetailScreen', { bookId: book.bookId });
  };
  
  const filteredBooks = useMemo(() => {
    return (booksCover ?? []).filter((bookCover) =>
      bookCover.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [booksCover, searchText]);

  return (
    <SafeAreaView className="flex-1">
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
    </SafeAreaView>
  );
}
