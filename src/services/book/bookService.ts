import axiosInstance from '~/api/axiosInstance';
import { Book } from '~/types/Book';

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/covers');
    const response = await axiosInstance.get('/Book/covers');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
