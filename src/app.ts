const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'

interface Book {
    id: number;
    title: string;
    author: string;
    color: string;
  
}

interface BookDetails {
    title: string;
    author: string;
    plot: string;
    audience: string;
    year: number;
    pages: number;
    publisher: string;

}

async function getBooks(apiUrl: string): Promise<Book[]> {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error!: ${response.status}`);
        };
        const books: Book[] = await response.json();

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

    const bookElement = document.createElement('article');
    bookElement.classList.add('book');

    const bookBackgroundColor = book.color || '#fff' ;
    bookElement.style.background = `
    linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${bookBackgroundColor}`;

    const titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    titleElement.classList.add('book__title')
    bookElement.append(titleElement);

    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;
    authorElement.classList.add('book__author');
    bookElement.append(authorElement);

    return bookElement;

}

(async function showBooks() {
    try {
        const books = await getBooks(apiUrl);
        const wrapperElement = document.querySelector('.wrapper');
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
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
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
        const noMatchesMessage = document.createElement('p');
        noMatchesMessage.textContent = 'No matches found!';
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
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'Show All';
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

    const returnButton = createHTMLElement('button', 'overlay__return-button', '\u2190');
    
    returnButton.addEventListener('click', () => {
        overlayContent.parentElement?.remove();
    });

    overlayContent.append(returnButton);

    const leftSideContainer = createHTMLElement('section', 'overlay-content__left-side');
    const bookElement = createBookElement(book);
    leftSideContainer.append(bookElement);

    overlayContent.append(leftSideContainer);

    const rightSideContainer = createHTMLElement('section', 'overlay-content__right-side');
    const detailsSection = showBookDetails(bookDetails);
    rightSideContainer.append(detailsSection);

    const linkButton = createHTMLElement('button', 'overlay__link-button', 'Oh, I want to read it!');
    rightSideContainer.append(linkButton);

    overlayContent.append(rightSideContainer);

    return overlayContent;

}


function createOverlay(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlay = createHTMLElement('section', 'overlay');
    const overlayContentElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);

    return overlay;
}


function showBookDetails(bookDetails: BookDetails): HTMLElement {
   
    const detailsContainer = document.createElement('section');
    detailsContainer.classList.add('overlay-content__details-container');
    
    const titleElement = createHTMLElement('h2', 'book__title', bookDetails.title);
    const authorElement = createHTMLElement('p', 'book__author', `By ${bookDetails.author}`);
    const descriptionElement = createHTMLElement('p', 'overlay-content__details', bookDetails.plot);

    detailsContainer.append(titleElement, authorElement, descriptionElement);

    const bookFactsContainer = document.createElement('section');
    bookFactsContainer.classList.add('overlay-content__facts-container');

    const audienceElement = createHTMLElement('p', 'overlay-content__details', bookDetails.audience);
    const firstPublishedElement = createHTMLElement('p', 'overlay-content__details', String(bookDetails.year));
    const pagesElement = createHTMLElement('p', 'overlay-content__details', bookDetails.pages !== null && bookDetails.pages !== undefined
    ? String(bookDetails.pages) : 'Not available');

    const publisherElement = createHTMLElement('p', 'overlay-content__details', bookDetails.publisher);
    bookFactsContainer.append(publisherElement);

    bookFactsContainer.append(audienceElement, firstPublishedElement, pagesElement, publisherElement);
    detailsContainer.append(bookFactsContainer);

    return detailsContainer;

}

function createHTMLElement(elementType: string, className: string, textContent?: string): HTMLElement {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}


