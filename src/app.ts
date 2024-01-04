import { getBooks, getBookDetails } from "./api.js";
import { Book, BookDetails } from "./interfaces.js";
import { booksData } from "./booksData.js";
import { createHTMLElement, createButton, createParagraph } from "./elementBuilders.js";
import { showOverlay } from "./overlay.js";

const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'


export function createBookElement(book: Book): HTMLElement {

    const bookElement:HTMLElement = createHTMLElement('article', 'book');

    const bookBackgroundColor: string = book.color || '#fff' ;
    bookElement.style.background = `
    linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${bookBackgroundColor}`;

    const titleElement: HTMLElement = createHTMLElement('h2', 'book__title', book.title);
    const authorElement: HTMLParagraphElement = createParagraph('book__author', book.author);
    
    bookElement.append(titleElement, authorElement);

    return bookElement;

}

(async function showBooks() {
    try {
        const books:Book[] = await getBooks(apiUrl);
        const wrapperElement:HTMLElement = document.querySelector('.wrapper');
        // checking if wrapperElement exist
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
        
    } catch (error) {
 
        console.error("Error message:", error.message);
    }
})();


// ------------------

function createMainTitle(bookCount: number): HTMLElement {
    const mainTitle = document.createElement('h1');
    mainTitle.textContent = getMainTitle(bookCount);
    mainTitle.classList.add('main-title');
    return mainTitle;
}

function getMainTitle(bookCount: number): string {
    return bookCount === 1
    ? `${bookCount} Classic Childrens book` 
    : bookCount > 1
    ? `${bookCount} Classic Childrens books` 
    : `Classic Childrens books`;
}

function createSearchContainerWithInput(): [HTMLElement, HTMLInputElement] {
    const searchContainer = document.createElement('section');
    searchContainer.classList.add('search-container');

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'input';
    searchInput.placeholder = 'Search by name or author';

    searchContainer.appendChild(searchInput);

    return [searchContainer, searchInput];
}

function createSearchButton(books: Book[], searchInput: HTMLInputElement, booksWrapper: HTMLElement, mainTitle: HTMLElement): HTMLButtonElement {
    const searchButton: HTMLButtonElement = createButton('button-search', 'Search');
    searchButton.addEventListener('click', () => makeSearch(books, searchInput, booksWrapper, mainTitle));
    return searchButton;
}

async function makeSearch(books: Book[], searchInput: HTMLInputElement, booksWrapper: HTMLElement, mainTitle: HTMLElement) {
    const currentSearchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(
        (book) => book.title.toLowerCase().includes(currentSearchTerm) || book.author.toLowerCase().includes(currentSearchTerm)
    );

    updateMainTitle(filteredBooks.length, mainTitle);

    booksWrapper.textContent = '';

    if (filteredBooks.length === 0) {
        const noMatchesMessage: HTMLParagraphElement = createParagraph('book-list__message', 'No matches found!');
        booksWrapper.append(noMatchesMessage);
    } else {
        filteredBooks.forEach((book) => {
            const bookElement = createBookElement(book);
            bookElement.addEventListener('click', async () => {
                const bookDetails = await getBookDetails(book);
                showOverlay(book, bookDetails);
            });
            booksWrapper.append(bookElement);
        });
    }

    searchInput.value = '';
}

function createShowAllButton(books: Book[], booksWrapper: HTMLElement, mainTitle: HTMLElement): HTMLButtonElement {
    const showAllButton: HTMLButtonElement = createButton('button-show-all', 'Show All');
    showAllButton.addEventListener('click', () => {
        displayAllBooks(books, booksWrapper, mainTitle);
        updateMainTitle(books.length, mainTitle);
    });
    return showAllButton;
}

function createBooksWrapper(): HTMLElement {
    const booksWrapper = document.createElement('section');
    booksWrapper.classList.add('book-list');
    return booksWrapper;
}

function displayAllBooks(books: Book[], booksWrapper: HTMLElement, mainTitle: HTMLElement) {
    booksWrapper.textContent = '';

    books.forEach((book) => {
        const bookElement = createBookElement(book);
        bookElement.addEventListener('click', async () => {
            const bookDetails = await getBookDetails(book);
            showOverlay(book, bookDetails);
        });
        booksWrapper.append(bookElement);
    });
}

function updateMainTitle(bookCount: number, mainTitle: HTMLElement) {
    mainTitle.textContent = getMainTitle(bookCount);
}

// ----------------------------------------








