const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'

interface Book {
    title: string;
    author: string;
    color: string;
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

(async function showBooks() {
    try {
        const books = await getBooks(apiUrl);

        const wrapperElement = document.querySelector('.wrapper');
        // checking if wrapperElement exist
        if (!wrapperElement) {
            console.error("Wrapper element not found.");
            return;
        }

        const booksWrapper = document.createElement('section');
        booksWrapper.classList.add('book-list');

        books.forEach(book => {
            const bookElement = document.createElement('article');
            bookElement.classList.add('book');

            const bookBackgroundColor = book.color || '#fff' ;
            bookElement.style.backgroundColor = bookBackgroundColor;


/*             const figureElement = document.createElement('figure');
            figureElement.classList.add('book__cover');
            bookElement.append(figureElement);
            figureElement.style.background = 'black'; */

            const titleElement = document.createElement('h2');
            titleElement.textContent = book.title;
            titleElement.classList.add('book__title')
            bookElement.append(titleElement);

            const authorElement = document.createElement('p');
            authorElement.textContent = book.author;
            authorElement.classList.add('book__author');
            bookElement.append(authorElement);

            bookElement.addEventListener('click', () => {
                showOverlay(book);
            });

            booksWrapper.appendChild(bookElement);
        });

        wrapperElement.append(booksWrapper);

        const mainTitle = document.createElement('h1');
        mainTitle.textContent = `${books.length} Classic Childrens books`;
        mainTitle.classList.add('main-title');
        wrapperElement.insertBefore(mainTitle, booksWrapper);

        console.log("Books:", books);
    } catch (error) {
 
        console.error("Error message:", error.message);
    }
})();

function showOverlay(clickedBook: Book) {

    const overlay = createOverlay(clickedBook);
    document.body.append(overlay);

}

function overlayContent(book: Book): HTMLElement {
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');

    const returnButton = document.createElement('button');
    returnButton.textContent = '\u2190';
    returnButton.classList.add('overlay__return-button');
    
    returnButton.addEventListener('click', () => {
        overlayContent.parentElement?.remove();
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


function createOverlay(book: Book): HTMLElement {
    const overlay = document.createElement('section');
    overlay.classList.add('overlay');
    const overlayContentElement = overlayContent(book);
    overlay.append(overlayContentElement);

    return overlay;
}




