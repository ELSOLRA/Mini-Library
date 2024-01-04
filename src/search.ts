import { createBookElement, createButton, createParagraph } from "./elementBuilders.js";
import { Book } from "./interfaces.js";
import { showOverlay } from "./overlay.js";
import { updateMainTitle } from "./updateTitle.js";
import { getBookDetails } from "./api.js";

export function createSearchButton(books: Book[], searchInput: HTMLInputElement, booksWrapper: HTMLElement, mainTitle: HTMLElement): HTMLButtonElement {
    const searchButton: HTMLButtonElement = createButton('button-search', 'Search');
    searchButton.addEventListener('click', () => makeSearch(books, searchInput, booksWrapper, mainTitle));
    return searchButton;
}

export async function makeSearch(books: Book[], searchInput: HTMLInputElement, booksWrapper: HTMLElement, mainTitle: HTMLElement): Promise<void> {
    const currentSearchTerm: string = searchInput.value.toLowerCase();
    const filteredBooks: Book[] = books.filter(
        (book) => book.title.toLowerCase().includes(currentSearchTerm) || book.author.toLowerCase().includes(currentSearchTerm));

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
    };

    searchInput.value = '';
};

export function createShowAllButton(books: Book[], booksWrapper: HTMLElement, mainTitle: HTMLElement): HTMLButtonElement {
    const showAllButton: HTMLButtonElement = createButton('button-show-all', 'Show All');
    showAllButton.addEventListener('click', () => {
        displayAllBooks(books, booksWrapper, mainTitle);
        updateMainTitle(books.length, mainTitle);
    });
    return showAllButton;
};

export function displayAllBooks(books: Book[], booksWrapper: HTMLElement, mainTitle: HTMLElement): void {
    booksWrapper.textContent = '';

    books.forEach((book) => {
        const bookElement = createBookElement(book);
        bookElement.addEventListener('click', async () => {
            const bookDetails = await getBookDetails(book);
            showOverlay(book, bookDetails);
        });
        booksWrapper.append(bookElement);
    });
};
