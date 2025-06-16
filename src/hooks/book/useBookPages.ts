import { useCallback, useState } from 'react';
import { fetchBookPages } from '~/services/book/bookService';
import { Page } from '~/types/Book/Page';
import { PageQueryParameters } from '~/types/Book/PageQueryParameters';

/**
 * Custom hook to fetch and manage paginated book pages using Cosmos DB continuation tokens.
 * @param bookId - The ID of the book (used as Cosmos DB partition key)
 * @param pageSize - The number of items to fetch per request (default: 10)
 */
export function useBookPages(bookId: string, pageSize = 10) {
  const [pages, setPages] = useState<Page[]>([]);
  const [continuationToken, setContinuationToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    if (!bookId || isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const queryParams: PageQueryParameters = {
        pageSize,
        continuationToken,
      };

      console.log('📘 Fetching pages with queryParams:', queryParams);

      const result = await fetchBookPages(bookId, queryParams);

      if (!Array.isArray(result.data)) {
        console.warn('[useBookPages] ⚠️ Invalid page data structure received');
        setError('Unexpected page data format from server.');
        return;
      }

      setPages(prev => [...prev, ...result.data]);



      const rawToken = result.continuationToken ?? null;
      setContinuationToken(rawToken);
      setHasMore(!!rawToken);


      setContinuationToken(rawToken);
      setHasMore(!!rawToken);
      console.log('✅ Stored continuationToken:', rawToken);
    } catch (err: any) {
      console.error('[useBookPages] ❌ Failed to fetch pages:', err?.message ?? err);
      setError('Failed to load pages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [bookId, continuationToken, hasMore, isLoading, pageSize]);

  return {
    pages,
    fetchPages,
    isLoading,
    hasMore,
    error,
  };
}
