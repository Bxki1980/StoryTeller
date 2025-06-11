import { useEffect, useState } from 'react';
import { fetchBooksCover } from '~/services/book/bookService';
import { BookCover } from '~/types/Book/BookCover';

export const useBooks = () => {
  const [books, setBooks] = useState<BookCover[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await fetchBooksCover();
        setBooks(fetchedBooks);
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return { books, loading, error };
};
