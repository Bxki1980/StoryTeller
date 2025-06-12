import { useEffect, useState } from 'react';
import { fetchBookDetail } from '~/services/book/bookService';
import { BookDetail } from '~/types/Book/BookDetail';

export const useBookDetail = (id: string) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchBookDetail(id);
        setBook(result ?? null);
      } catch (e: any) {
        console.error('❌ Failed to load book:', e);
        setError('Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { book, loading, error };
};
