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
(function showBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield getBooks(apiUrl);
            const wrapperElement = document.querySelector('.wrapper');
            if (!wrapperElement) {
                console.error("Wrapper element not found.");
                return;
            }
            const booksWrapper = document.createElement('section');
            booksWrapper.classList.add('book-list');
            books.forEach(book => {
                const articleElement = document.createElement('article');
                articleElement.classList.add('book');
                const titleElement = document.createElement('h2');
                titleElement.textContent = book.title;
                titleElement.classList.add('book__title');
                articleElement.append(titleElement);
                const authorElement = document.createElement('p');
                authorElement.textContent = book.author;
                authorElement.classList.add('book__author');
                articleElement.append(authorElement);
                articleElement.addEventListener('click', () => {
                    showOverlay(book);
                });
                booksWrapper.appendChild(articleElement);
            });
            wrapperElement.append(booksWrapper);
            const mainTitle = document.createElement('h1');
            mainTitle.textContent = `${books.length} Classic Childrens books`;
            mainTitle.classList.add('main-title');
            wrapperElement.insertBefore(mainTitle, booksWrapper);
            console.log("Books:", books);
        }
        catch (error) {
            console.error("Error message:", error.message);
        }
    });
})();
function showOverlay(clickedBook) {
    const overlay = createOverlay(clickedBook);
    document.body.append(overlay);
}
function overlayContent(book) {
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');
    const returnButton = document.createElement('button');
    returnButton.textContent = '\u2190';
    returnButton.classList.add('overlay__return-button');
    returnButton.addEventListener('click', () => {
        var _a;
        (_a = overlayContent.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    overlayContent.append(returnButton);
    const overlayTitle = document.createElement('h2');
    overlayTitle.textContent = book.title;
    overlayTitle.classList.add('overlay__title');
    overlayContent.append(overlayTitle);
    const overlayAuthor = document.createElement('p');
    overlayAuthor.textContent = book.author;
    overlayAuthor.classList.add('overlay__author');
    overlayContent.append(overlayAuthor);
    return overlayContent;
}
function createOverlay(book) {
    const overlay = document.createElement('section');
    overlay.classList.add('overlay');
    const overlayContentElement = overlayContent(book);
    overlay.append(overlayContentElement);
    return overlay;
}
