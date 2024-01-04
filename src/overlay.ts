import { createHTMLElement, createButton, createParagraph } from "./elementBuilders.js";
import { Book, BookDetails } from "./interfaces.js";
import { createBookElement } from "./elementBuilders.js";
import { booksData } from "./booksData.js";

//------ Function to show an overlay with detailed information about a book
export async function showOverlay(clickedBook: Book, bookDetails: BookDetails ): Promise<void> {
    const overlay: HTMLElement = createOverlay(clickedBook, bookDetails);
    document.body.append(overlay);
};

//------ Function that creates and returns the content of the overlay with buttons, book details, and links
export function overlayContent(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlayContent: HTMLElement = createHTMLElement('article', 'overlay-content');

    const returnButton: HTMLButtonElement = createButton('return-button');
    const returnArrows: HTMLElement = createHTMLElement('section', 'return-button__arrows-container');
    const firstArrrow: HTMLElement = createHTMLElement('span', 'return-button__arrow');
    const secondArrrow: HTMLElement = createHTMLElement('span', 'return-button__arrow');
    const thirdArrrow: HTMLElement = createHTMLElement('span', 'return-button__arrow');

    returnButton.addEventListener('click', () => {
        overlayContent.parentElement?.remove();
    });

    returnArrows.append(firstArrrow, secondArrrow, thirdArrrow);
    returnButton.append(returnArrows);
    overlayContent.append(returnButton);

    const mainContainer: HTMLElement = createHTMLElement('section', 'overlay-content__main-container');

    const leftSideContainer: HTMLElement = createHTMLElement('section', 'overlay-content__left-side');
    const bookElement: HTMLElement = createBookElement(book);
    leftSideContainer.append(bookElement);

    const rightSideContainer: HTMLElement = createHTMLElement('section', 'overlay-content__right-side');
    const detailsSection: HTMLElement = showBookDetails(book, bookDetails);
    

    
    rightSideContainer.append(detailsSection);

    mainContainer.append(leftSideContainer, rightSideContainer);
    overlayContent.append(mainContainer);

    return overlayContent;
};

//------ Function that creates an overlay element with the provided overlay content
function createOverlay(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlay: HTMLElement = createHTMLElement('section', 'overlay');
    const overlayContentElement: HTMLElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);

    return overlay;
};

//------ Function that creates and returns HTML elements book details
function showBookDetails(book: Book, bookDetails: BookDetails): HTMLElement {
   
    const detailsContainer: HTMLElement = createHTMLElement('section', 'overlay-content__details-container' );
    
    const titleElement: HTMLElement = createHTMLElement('h2', 'book__title', bookDetails.title);
    const authorElement: HTMLParagraphElement = createParagraph('book__author', `By ${bookDetails.author}`);
    const descriptionElement: HTMLParagraphElement = createParagraph('overlay-content__description', bookDetails.plot);

    detailsContainer.append(titleElement, authorElement, descriptionElement);

    const bookFactsContainer: HTMLElement = document.createElement('section');
    bookFactsContainer.classList.add('overlay-content__facts-container');

    const audienceElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.audience);
    const firstPublishedElement: HTMLParagraphElement = createParagraph('overlay-content__details', String(bookDetails.year));
    const pagesElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.pages !== null && bookDetails.pages !== undefined
    ? String(bookDetails.pages) : 'Not available');

    const publisherElement: HTMLParagraphElement = createParagraph('overlay-content__details', bookDetails.publisher);
    bookFactsContainer.append(publisherElement);

    const linkButton: HTMLButtonElement = createButton('overlay__link-button', 'Oh, I want to read it!');
    linkButton.addEventListener('click', () => {
        const matchedBookData: {title:string, linkUrl:string} = booksData.find((data) => data.title === book.title);
    
        if (matchedBookData) {
          window.location.href = matchedBookData.linkUrl || '#';
        } else {
          console.error('Book data not found for:', book.title);
          window.location.href = 'index.html';
        };
        });

    bookFactsContainer.append(audienceElement, firstPublishedElement, pagesElement, publisherElement);
    detailsContainer.append(titleElement, authorElement, descriptionElement, bookFactsContainer, linkButton);

    return detailsContainer;
};