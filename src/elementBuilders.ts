import { Book } from "./interfaces.js";
import { getMainTitle } from "./updateTitle.js";

//------ Function to create a book element with properties
export function createBookElement(book: Book): HTMLElement {

    const bookElement:HTMLElement = createHTMLElement('article', 'book');

    const bookBackgroundColor: string = book.color || '#fff' ;
    bookElement.style.background = `
    linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${bookBackgroundColor}`;

    const titleElement: HTMLElement = createHTMLElement('h2', 'book__title', book.title);
    const authorElement: HTMLParagraphElement = createParagraph('book__author', book.author);
    
    bookElement.append(titleElement, authorElement);

    return bookElement;

};

//------ Function to create wrapper for a list of books
export function createBooksWrapper(): HTMLElement {
    const booksWrapper: HTMLElement = document.createElement('section');
    booksWrapper.classList.add('book-list');
    return booksWrapper;
};

//------ Function to create a search container with an input element
export function createSearchContainerWithInput(): [HTMLElement, HTMLInputElement] {
    const searchContainer: HTMLElement = document.createElement('section');
    searchContainer.classList.add('search-container');

    const searchInput: HTMLInputElement = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'input';
    searchInput.placeholder = 'Search by name or author';

    searchContainer.appendChild(searchInput);

    return [searchContainer, searchInput];
};

//------ Function to create a main title element with the count of books
export function createMainTitle(bookCount: number): HTMLElement {
    const mainTitle: HTMLElement = document.createElement('h1');
    mainTitle.textContent = getMainTitle(bookCount);
    mainTitle.classList.add('main-title');
    return mainTitle;
}

//------ Function to create a HTML element with optional text content
export function createHTMLElement(elementType: string, className: string, textContent?: string): HTMLElement {
    const element: HTMLElement = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
};

//------ Function to create a button element with optional text content
export function createButton(className: string, textContent?: string): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
};

//------ Function to create a paragraph element with optional text content
export function createParagraph(className: string, textContent?: string): HTMLParagraphElement {
    const element: HTMLParagraphElement = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
};