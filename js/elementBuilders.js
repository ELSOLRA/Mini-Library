import { getMainTitle } from "./updateTitle.js";
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
;
export function createBooksWrapper() {
    const booksWrapper = document.createElement('section');
    booksWrapper.classList.add('book-list');
    return booksWrapper;
}
;
export function createSearchContainerWithInput() {
    const searchContainer = document.createElement('section');
    searchContainer.classList.add('search-container');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'input';
    searchInput.placeholder = 'Search by name or author';
    searchContainer.appendChild(searchInput);
    return [searchContainer, searchInput];
}
;
export function createMainTitle(bookCount) {
    const mainTitle = document.createElement('h1');
    mainTitle.textContent = getMainTitle(bookCount);
    mainTitle.classList.add('main-title');
    return mainTitle;
}
export function createHTMLElement(elementType, className, textContent) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
;
export function createButton(className, textContent) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
}
;
export function createParagraph(className, textContent) {
    const element = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
;
