import { Book } from "./interfaces.js";
import { getMainTitle } from "./updateTitle.js";


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

export function createBooksWrapper(): HTMLElement {
    const booksWrapper: HTMLElement = document.createElement('section');
    booksWrapper.classList.add('book-list');
    return booksWrapper;
};

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

export function createMainTitle(bookCount: number): HTMLElement {
    const mainTitle: HTMLElement = document.createElement('h1');
    mainTitle.textContent = getMainTitle(bookCount);
    mainTitle.classList.add('main-title');
    return mainTitle;
}

export function createHTMLElement(elementType: string, className: string, textContent?: string): HTMLElement {
    const element: HTMLElement = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
};

export function createButton(className: string, textContent?: string): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
};

export function createParagraph(className: string, textContent?: string): HTMLParagraphElement {
    const element: HTMLParagraphElement = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
};