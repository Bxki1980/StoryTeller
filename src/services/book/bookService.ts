import axiosInstance from '~/api/axiosInstance';
import { ApiResponse } from '~/types/api/ApiResponse';
import { BookDetail } from '~/types/Book/BookDetail';
import { BookCover } from '~/types/Book/BookCover';
import { Page } from '~/types/Book/Page';
import { PageQueryParameters } from '~/types/Book/PageQueryParameters';



export interface PaginatedContinuationResponse<T> {
  data: T[];
  continuationToken: string | null;
}



export const fetchBooksCover = async (): Promise<BookCover[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/covers');
    const response = await axiosInstance.get<ApiResponse<BookCover[]>>('/Book/covers');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


export const fetchBookDetail = async (id: string): Promise<BookDetail> => {
  try {
    const response = await axiosInstance.get<ApiResponse<BookDetail>>(`/Book/${id}/detail`);

    if (!response.data.success || !response.data.data) {
      throw new Error('Book not found');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Error in fetchBookDetail:', error);
    throw error;
  }
};



export const fetchBookById = async (id: string): Promise<BookDetail> => {
  try {
    console.log('📡 Fetching book from:', axiosInstance.defaults.baseURL + `/Book/details/${id}`);
    const response = await axiosInstance.get(`/Book/details/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};



/**
 * Fetch paginated book pages using continuation token (Cosmos DB friendly).
 * @param bookId Book ID (partition key)
 * @param queryParams Pagination parameters
 * @returns Continuation-based paginated list of pages
 */
export async function fetchBookPages(
  bookId: string,
  queryParams: PageQueryParameters
): Promise<PaginatedContinuationResponse<Page>> {
  if (!bookId) {
    throw new Error('📕 Book ID must be provided.');
  }

  const endpoint = `/page/book/${bookId}/pages`;
  const params = {
    pageSize: queryParams.pageSize,
    continuationToken: queryParams.continuationToken || undefined,
  };

  try {
    console.log('📦 Fetching pages with params:', params);
    console.log('📦 Endpoint:', endpoint);

    const response = await axiosInstance.get<ApiResponse<PaginatedContinuationResponse<Page>>>(
      endpoint,
      { params }
    );

    const { success, data, errors } = response.data;

    if (!success || !data) {
      console.error('❌ Failed to load book pages:', errors);
      throw new Error('Failed to load book pages');
    }

    return data;
  } catch (error: any) {
    console.error(`[BookService] ❌ Error fetching pages for book ${bookId}:`, error?.message ?? error);
    throw error;
  }
}
