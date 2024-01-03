const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'

import { Book, BookDetails } from "./interfaces.js";
import { booksData } from "./booksData.js";

async function getBooks(apiUrl: string): Promise<Book[]> {
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

async function getBookDetails(book: Book): Promise<BookDetails> {
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


function createBookElement(book: Book): HTMLElement {

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

async function showOverlay(clickedBook: Book, bookDetails: BookDetails ) {
    const overlay = createOverlay(clickedBook, bookDetails);
    document.body.append(overlay);

}

function overlayContent(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlayContent = createHTMLElement('article', 'overlay-content');

    const returnButton: HTMLButtonElement = createButton('return-button');
    const returnArrows = createHTMLElement('section', 'return-button__arrows-container');
    const firstArrrow = createHTMLElement('span', 'return-button__arrow');
    const secondArrrow = createHTMLElement('span', 'return-button__arrow');
    const thirdArrrow = createHTMLElement('span', 'return-button__arrow');

    returnButton.addEventListener('click', () => {
        overlayContent.parentElement?.remove();
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


function createOverlay(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlay = createHTMLElement('section', 'overlay');
    const overlayContentElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);

    return overlay;
}


function showBookDetails(book: Book, bookDetails: BookDetails): HTMLElement {
   
    const detailsContainer = createHTMLElement('section', 'overlay-content__details-container' );
    
    const titleElement = createHTMLElement('h2', 'book__title', bookDetails.title);
    const authorElement: HTMLParagraphElement = createParagraph('book__author', `By ${bookDetails.author}`);
    const descriptionElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.plot);

    detailsContainer.append(titleElement, authorElement, descriptionElement);

    const bookFactsContainer = document.createElement('section');
    bookFactsContainer.classList.add('overlay-content__facts-container');

    const audienceElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.audience);
    const firstPublishedElement: HTMLParagraphElement = createParagraph('overlay-content__details', String(bookDetails.year));
    const pagesElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.pages !== null && bookDetails.pages !== undefined
    ? String(bookDetails.pages) : 'Not available');

    const publisherElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.publisher);
    bookFactsContainer.append(publisherElement);

    const linkButton = createHTMLElement('button', 'overlay__link-button', 'Oh, I want to read it!');
    linkButton.addEventListener('click', () => {
        const matchedBookData = booksData.find((data) => data.title === book.title);
    
        if (matchedBookData) {
          window.location.href = matchedBookData.linkUrl || '#';
        } else {
          console.error('Book data not found for:', book.title);
          window.location.href = 'index.html';
        }
        });

    bookFactsContainer.append(audienceElement, firstPublishedElement, pagesElement, publisherElement);
    detailsContainer.append(titleElement, authorElement, descriptionElement, bookFactsContainer, linkButton);

    return detailsContainer;

}

function createHTMLElement(elementType: string, className: string, textContent?: string): HTMLElement {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}

function createButton(className: string, textContent?: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
  }

  function createParagraph(className: string, textContent?: string): HTMLParagraphElement {
    const element = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
