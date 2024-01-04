var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
export function getBooks(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error!: ${response.status}`);
            }
            ;
            const books = yield response.json();
            console.log(books);
            return books;
        }
        catch (error) {
            console.error("Error fetching books:", error);
            throw error;
        }
        ;
    });
}
;
export function getBookDetails(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${apiUrl}/${book.id}`);
            if (!response.ok) {
                throw new Error(`HTTP Error!: ${response.status}`);
            }
            ;
            const bookDetails = yield response.json();
            console.log(bookDetails);
            return bookDetails;
        }
        catch (error) {
            console.error("Error fetching book details:", error);
            throw error;
        }
        ;
    });
}
