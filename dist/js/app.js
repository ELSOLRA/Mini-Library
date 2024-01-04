var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks, getBookDetails } from "./api.js";
import { createHTMLElement, createButton, createParagraph } from "./elementBuilders.js";
import { showOverlay } from "./overlay.js";
const apiUrl = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
export function createBookElement(book) {
    const bookElement = createHTMLElement('article', 'book');
    const bookBackgroundColor = book.color || '#fff';
    bookElement.style.background = `
    linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${bookBackgroundColor}`;
    const titleElement = createHTMLElement('h2', 'book__title', book.title);
    const authorElement = createParagraph('book__author', book.author);
    bookElement.append(titleElement, authorElement);
    return bookElement;
}
(function showBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield getBooks(apiUrl);
            const wrapperElement = document.querySelector('.wrapper');
            if (!wrapperElement) {
                console.error("Wrapper element not found.");
                return;
            }
            const mainTitle = createMainTitle(books.length);
            const [searchContainer, searchInput] = createSearchContainerWithInput();
            const booksWrapper = createBooksWrapper();
            wrapperElement.append(mainTitle, searchContainer, booksWrapper);
            const searchButton = createSearchButton(books, searchInput, booksWrapper, mainTitle);
            const showAllButton = createShowAllButton(books, booksWrapper, mainTitle);
            searchContainer.append(searchButton, showAllButton);
            updateMainTitle(books.length, mainTitle);
        }
        catch (error) {
            console.error("Error message:", error.message);
        }
    });
})();
function createMainTitle(bookCount) {
    const mainTitle = document.createElement('h1');
    mainTitle.textContent = getMainTitle(bookCount);
    mainTitle.classList.add('main-title');
    return mainTitle;
}
function getMainTitle(bookCount) {
    return bookCount === 1
        ? `${bookCount} Classic Childrens book`
        : bookCount > 1
            ? `${bookCount} Classic Childrens books`
            : `Classic Childrens books`;
}
function createSearchContainerWithInput() {
    const searchContainer = document.createElement('section');
    searchContainer.classList.add('search-container');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'input';
    searchInput.placeholder = 'Search by name or author';
    searchContainer.appendChild(searchInput);
    return [searchContainer, searchInput];
}
function createSearchButton(books, searchInput, booksWrapper, mainTitle) {
    const searchButton = createButton('button-search', 'Search');
    searchButton.addEventListener('click', () => makeSearch(books, searchInput, booksWrapper, mainTitle));
    return searchButton;
}
function makeSearch(books, searchInput, booksWrapper, mainTitle) {
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
        searchInput.value = '';
    });
}
function createShowAllButton(books, booksWrapper, mainTitle) {
    const showAllButton = createButton('button-show-all', 'Show All');
    showAllButton.addEventListener('click', () => {
        displayAllBooks(books, booksWrapper, mainTitle);
        updateMainTitle(books.length, mainTitle);
    });
    return showAllButton;
}
function createBooksWrapper() {
    const booksWrapper = document.createElement('section');
    booksWrapper.classList.add('book-list');
    return booksWrapper;
}
function displayAllBooks(books, booksWrapper, mainTitle) {
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
function updateMainTitle(bookCount, mainTitle) {
    mainTitle.textContent = getMainTitle(bookCount);
}
