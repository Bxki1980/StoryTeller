import { useEffect, useState } from "react";
import { fetchBooks } from "~/services/book/bookService";
import { Book } from "~/types/Book";

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks);
            } catch (error) {
                setError('Error fetching books');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    return { books, loading, error };
}