import axiosInstance from '~/api/axiosInstance';
import { Book } from '~/types/Book';

export const fetchBooksCover = async (): Promise<Book[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/covers');
    const response = await axiosInstance.get('/Book/covers');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


export const fetchBooksDetail = async (): Promise<Book[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/details');
    const response = await axiosInstance.get('/Book/details');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
