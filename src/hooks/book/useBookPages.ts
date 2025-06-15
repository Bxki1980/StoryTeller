import { useCallback, useState } from 'react';
import { fetchBookPages } from '~/services/book/bookService';
import { Page } from '~/types/Book/Page';
import { PageQueryParameters } from '~/types/Book/PageQueryParameters';

/**
 * Custom hook to manage paginated fetching of book pages.
 */
export function useBookPages(bookId: string, pageSize = 10) {
  const [pages, setPages] = useState<Page[]>([]);
  const [continuationToken, setContinuationToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPages = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const queryParams: PageQueryParameters = {
        pageSize,
        continuationToken, // ✅ Send raw token only
      };

      console.log('[📦 Sending continuationToken]', continuationToken);

      const result = await fetchBookPages(bookId, queryParams);

      if (!result || !Array.isArray(result.data)) {
        console.warn('[useBookPages] Invalid page data structure returned');
        return;
      }

      setPages(prev => [...prev, ...result.data]);

      const newToken = result.continuationToken;
      setContinuationToken(newToken ?? null);
      setHasMore(!!newToken);
    } catch (error) {
      console.error('[useBookPages] Failed to fetch pages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, continuationToken, hasMore, isLoading, pageSize]);

  return {
    pages,
    fetchPages,
    isLoading,
    hasMore,
  };
}
