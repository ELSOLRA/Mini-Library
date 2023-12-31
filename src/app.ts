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
    details: {
        audience: string;
        firstPublished: number;
        pages: number;
        publisher: string;
    };
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

        const booksWrapper = document.createElement('section');
        booksWrapper.classList.add('book-list');

        books.forEach(book => {

            const bookElement = createBookElement(book);
            
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

async function showOverlay(clickedBook: Book) {
    const bookDetails = await getBookDetails(clickedBook);
    const overlay = createOverlay(clickedBook, bookDetails);
    document.body.append(overlay);

}

function overlayContent(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlayContent = document.createElement('article');
    overlayContent.classList.add('overlay-content');

    const returnButton = document.createElement('button');
    returnButton.textContent = '\u2190';
    returnButton.classList.add('overlay__return-button');
    
    returnButton.addEventListener('click', () => {
        overlayContent.parentElement?.remove();
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

    overlayContent.append(rightSideContainer);




    return overlayContent;

}


function createOverlay(book: Book, bookDetails: BookDetails): HTMLElement {
    const overlay = document.createElement('section');
    overlay.classList.add('overlay');
    const overlayContentElement = overlayContent(book, bookDetails);
    overlay.append(overlayContentElement);

    return overlay;
}


function showBookDetails(bookDetails: BookDetails): HTMLElement {
   
    const detailsContainer = document.createElement('section');
    detailsContainer.classList.add('overlay-content__details-container');
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = bookDetails.title;
    titleElement.classList.add('overlay-content__title');
    detailsContainer.appendChild(titleElement);

    const authorElement = document.createElement('p');
    authorElement.textContent = `By ${bookDetails.author}`;
    detailsContainer.appendChild(authorElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = bookDetails.plot;
    detailsContainer.appendChild(descriptionElement);

    return detailsContainer;

}


