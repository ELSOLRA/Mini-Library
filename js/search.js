var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBookElement, createButton, createParagraph } from "./elementBuilders.js";
import { showOverlay } from "./overlay.js";
import { updateMainTitle } from "./updateTitle.js";
import { getBookDetails } from "./api.js";
export function createSearchButton(books, searchInput, booksWrapper, mainTitle) {
    const searchButton = createButton('button-search', 'Search');
    searchButton.addEventListener('click', () => makeSearch(books, searchInput, booksWrapper, mainTitle));
    return searchButton;
}
export function makeSearch(books, searchInput, booksWrapper, mainTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentSearchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(currentSearchTerm) || book.author.toLowerCase().includes(currentSearchTerm));
        updateMainTitle(filteredBooks.length, mainTitle);
        booksWrapper.textContent = '';
        if (filteredBooks.length === 0) {
            const noMatchesMessage = createParagraph('book-list__message', 'No matches found!');
            booksWrapper.append(noMatchesMessage);
        }
        else {
            filteredBooks.forEach((book) => {
                const bookElement = createBookElement(book);
                bookElement.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    const bookDetails = yield getBookDetails(book);
                    showOverlay(book, bookDetails);
                }));
                booksWrapper.append(bookElement);
            });
        }
        ;
        searchInput.value = '';
    });
}
;
export function createShowAllButton(books, booksWrapper, mainTitle) {
    const showAllButton = createButton('button-show-all', 'Show All');
    showAllButton.addEventListener('click', () => {
        displayAllBooks(books, booksWrapper, mainTitle);
        updateMainTitle(books.length, mainTitle);
    });
    return showAllButton;
}
;
export function displayAllBooks(books, booksWrapper, mainTitle) {
    booksWrapper.textContent = '';
    books.forEach((book) => {
        const bookElement = createBookElement(book);
        bookElement.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const bookDetails = yield getBookDetails(book);
            showOverlay(book, bookDetails);
        }));
        booksWrapper.append(bookElement);
    });
}
;
