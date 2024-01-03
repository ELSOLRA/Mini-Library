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
import { booksData } from "./booksData.js";
function getBooks(apiUrl) {
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
function getBookDetails(book) {
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
function createBookElement(book) {
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
function showOverlay(clickedBook, bookDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const overlay = createOverlay(clickedBook, bookDetails);
        document.body.append(overlay);
    });
}
function overlayContent(book, bookDetails) {
    const overlayContent = createHTMLElement('article', 'overlay-content');
    const returnButton = createButton('return-button');
    const returnArrows = createHTMLElement('section', 'return-button__arrows-container');
    const firstArrrow = createHTMLElement('span', 'return-button__arrow');
    const secondArrrow = createHTMLElement('span', 'return-button__arrow');
    const thirdArrrow = createHTMLElement('span', 'return-button__arrow');
    returnButton.addEventListener('click', () => {
        var _a;
        (_a = overlayContent.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    returnArrows.append(firstArrrow, secondArrrow, thirdArrrow);
    returnButton.append(returnArrows);
    overlayContent.append(returnButton);
    const mainContainer = createHTMLElement('section', 'overlay-content__main-container');
    const leftSideContainer = createHTMLElement('section', 'overlay-content__left-side');
    const bookElement = createBookElement(book);
    leftSideContainer.append(bookElement);
    const rightSideContainer = createHTMLElement('section', 'overlay-content__right-side');
    const detailsSection = showBookDetails(book, bookDetails);
    rightSideContainer.append(detailsSection);
    mainContainer.append(leftSideContainer, rightSideContainer);
    overlayContent.append(mainContainer);
    return overlayContent;
}
function createOverlay(book, bookDetails) {
    const overlay = createHTMLElement('section', 'overlay');
    const overlayContentElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);
    return overlay;
}
function showBookDetails(book, bookDetails) {
    const detailsContainer = createHTMLElement('section', 'overlay-content__details-container');
    const titleElement = createHTMLElement('h2', 'book__title', bookDetails.title);
    const authorElement = createParagraph('book__author', `By ${bookDetails.author}`);
    const descriptionElement = createParagraph('overlay-content__details', bookDetails.plot);
    detailsContainer.append(titleElement, authorElement, descriptionElement);
    const bookFactsContainer = document.createElement('section');
    bookFactsContainer.classList.add('overlay-content__facts-container');
    const audienceElement = createParagraph('overlay-content__details', bookDetails.audience);
    const firstPublishedElement = createParagraph('overlay-content__details', String(bookDetails.year));
    const pagesElement = createParagraph('overlay-content__details', bookDetails.pages !== null && bookDetails.pages !== undefined
        ? String(bookDetails.pages) : 'Not available');
    const publisherElement = createParagraph('overlay-content__details', bookDetails.publisher);
    bookFactsContainer.append(publisherElement);
    const linkButton = createHTMLElement('button', 'overlay__link-button', 'Oh, I want to read it!');
    linkButton.addEventListener('click', () => {
        const matchedBookData = booksData.find((data) => data.title === book.title);
        if (matchedBookData) {
            window.location.href = matchedBookData.linkUrl || '#';
        }
        else {
            console.error('Book data not found for:', book.title);
            window.location.href = 'index.html';
        }
    });
    bookFactsContainer.append(audienceElement, firstPublishedElement, pagesElement, publisherElement);
    detailsContainer.append(titleElement, authorElement, descriptionElement, bookFactsContainer, linkButton);
    return detailsContainer;
}
function createHTMLElement(elementType, className, textContent) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
function createButton(className, textContent) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
}
function createParagraph(className, textContent) {
    const element = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
