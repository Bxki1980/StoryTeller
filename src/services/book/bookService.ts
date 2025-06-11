import axiosInstance from '~/api/axiosInstance';
import { Page } from '~/types/Book/Page';
import {BookDetail} from '~/types/Book/BookDetail';
import {BookCover} from '~/types/Book/BookCover';


export const fetchBooksCover = async (): Promise<BookCover[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/covers');
    const response = await axiosInstance.get('/Book/covers');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


export const fetchBooksDetail = async (): Promise<BookDetail[]> => {
  try {
    console.log('📡 Fetching books from:', axiosInstance.defaults.baseURL + '/Book/details');
    const response = await axiosInstance.get('/Book/details');
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