import React from 'react';
import { View, FlatList } from 'react-native';
import { BookCover } from '~/types/Book/BookCover';
import BookCard from './BookCard';

interface Props {
  booksCover: BookCover[];
  onBookPress: (booksCover: BookCover) => void;
}

export default function BookGrid({ booksCover, onBookPress }: Props) {
  return (
    <FlatList
      data={booksCover}
      keyExtractor={(item) => item.bookId}
      numColumns={2}
      contentContainerStyle={{ padding: 8, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <BookCard bookCover={item} onPress={() => onBookPress(item)} />}
    />
  );
}
