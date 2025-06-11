import axiosInstance from '~/api/axiosInstance';
import { ApiResponse } from '~/types/api/ApiResponse';
import { BookDetail } from '~/types/Book/BookDetail';
import { BookCover } from '~/types/Book/BookCover';

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

export const fetchBookDetail = async (bookId: string): Promise<BookDetail[]> => {
  try {
      if (!bookId) throw new Error('Book ID is required for fetchBookDetail');
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + `/Book/${bookId}/detail`);
    const response = await axiosInstance.get(`/Book/${bookId}/detail`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
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
