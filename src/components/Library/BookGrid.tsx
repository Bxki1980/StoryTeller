import React from 'react';
import { View, FlatList } from 'react-native';
import { Book } from '~/types/Book';
import BookCard from './BookCard';

interface Props {
  books: Book[];
  onBookPress: (book: Book) => void;
}

export default function BookGrid({ books, onBookPress }: Props) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ padding: 8, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <BookCard book={item} onPress={() => onBookPress(item)} />}
    />
  );
}
