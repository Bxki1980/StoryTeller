import axiosInstance from "~/api/axiosInstance";
import { Book } from "~/types/Book";

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axiosInstance.get('/api/Book');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}