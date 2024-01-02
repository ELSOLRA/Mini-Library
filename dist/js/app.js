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
function getBooks(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error!: ${response.status}`);
            }
            ;
            const books = yield response.json();
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
    const bookElement = document.createElement('article');
    bookElement.classList.add('book');
    const bookBackgroundColor = book.color || '#fff';
    bookElement.style.background = `
    linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${bookBackgroundColor}`;
    const titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    titleElement.classList.add('book__title');
    bookElement.append(titleElement);
    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;
    authorElement.classList.add('book__author');
    bookElement.append(authorElement);
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
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
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
            const noMatchesMessage = document.createElement('p');
            noMatchesMessage.textContent = 'No matches found!';
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
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'Show All';
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
    const overlayContent = document.createElement('article');
    overlayContent.classList.add('overlay-content');
    const returnButton = document.createElement('button');
    returnButton.textContent = '\u2190';
    returnButton.classList.add('overlay__return-button');
    returnButton.addEventListener('click', () => {
        var _a;
        (_a = overlayContent.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    overlayContent.append(returnButton);
    const leftSideContainer = document.createElement('section');
    leftSideContainer.classList.add('overlay-content__left-side');
    const bookElement = createBookElement(book);
    leftSideContainer.append(bookElement);
    overlayContent.append(leftSideContainer);
    const rightSideContainer = document.createElement('section');
    rightSideContainer.classList.add('overlay-content__right-side');
    const detailsSection = showBookDetails(bookDetails);
    rightSideContainer.append(detailsSection);
    const linkButton = document.createElement('button');
    linkButton.textContent = 'Oh, I want to read it!';
    linkButton.classList.add('overlay__link-button');
    rightSideContainer.append(linkButton);
    overlayContent.append(rightSideContainer);
    return overlayContent;
}
function createOverlay(book, bookDetails) {
    const overlay = document.createElement('section');
    overlay.classList.add('overlay');
    const overlayContentElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);
    return overlay;
}
function showBookDetails(bookDetails) {
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
function createHTMLElement(elementType, className, textContent) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
