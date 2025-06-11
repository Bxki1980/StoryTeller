import { useEffect, useState } from 'react';
import { BookCover } from '~/types/Book/BookCover';
import { fetchBooksCover } from '~/services/book/bookService';

export const useBooksCover = () => {
  const [booksCover, setBooksCover] = useState<BookCover[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchBooksCover();
        setBooksCover(result);
      } catch (err: any) {
        console.error('❌ useBooksCover error:', err.message || err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { booksCover, loading, error };
};
