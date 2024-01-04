import { Book, BookDetails } from "./interfaces.js";

const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'

export async function getBooks(apiUrl: string): Promise<Book[]> {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error!: ${response.status}`);
        };
        const books: Book[] = await response.json();
        console.log(books);
        return books;
        
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    };
};

export async function getBookDetails(book: Book): Promise<BookDetails> {
    try {
        const response = await fetch(`${apiUrl}/${book.id}`);
        if (!response.ok) {
            throw new Error(`HTTP Error!: ${response.status}`);
        };
        const bookDetails: BookDetails = await response.json();
        console.log(bookDetails);
        return bookDetails;
        
    } catch (error) {
        console.error("Error fetching book details:", error);
        throw error;
    };
}