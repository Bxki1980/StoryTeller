import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Book } from '~/types/Book';

interface Props {
  book: Book;
  onPress: () => void;
}

export default function BookCard({ book, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2x m-2 w-[160px] bg-white shadow-md"
      activeOpacity={0.85}>
      <Image
        source={{ uri: book.coverImageBlobUrl }}
        className="rounded-t-2x h-48 w-full"
        resizeMode="cover"
      />
      <View>
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
          {book.title}
        </Text>
        <Text className="text-xs text-gray-500">{book.author}</Text>
        <Text className="mt-1 text-xs text-violet-500">{book.ageRange}</Text>
      </View>
    </TouchableOpacity>
  );
}
