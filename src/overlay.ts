import { createHTMLElement, createButton, createParagraph } from "./elementBuilders.js";
import { Book, BookDetails } from "./interfaces.js";
import { createBookElement } from "./app.js";
import { booksData } from "./booksData.js";

export async function showOverlay(clickedBook: Book, bookDetails: BookDetails ) {
    const overlay = createOverlay(clickedBook, bookDetails);
    document.body.append(overlay);
}

export function overlayContent(book: Book, bookDetails: BookDetails): HTMLElement {
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
    const descriptionElement: HTMLParagraphElement = createParagraph('overlay-content__description', bookDetails.plot);

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