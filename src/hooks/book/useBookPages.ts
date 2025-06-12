import { useCallback, useState } from 'react';
import { fetchBookPages } from '~/services/book/bookService';
import { Page } from '~/types/Book/Page';
import { PageQueryParameters } from '~/types/Book/PageQueryParameters';

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
        continuationToken,
      };

      const result = await fetchBookPages(bookId, queryParams);

      setPages(prev => [...prev, ...result.data]);
      setContinuationToken(result.continuationToken);
      setHasMore(!!result.continuationToken);
    } catch (error) {
      console.error('[useBookPages] Failed to fetch pages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, pageSize, continuationToken, hasMore, isLoading]);

  return {
    pages,
    fetchPages,
    isLoading,
    hasMore,
  };
}
