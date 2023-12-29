const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'

interface Book {
    title: string;
    author: string;
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
            const articleElement = document.createElement('article');
            articleElement.classList.add('book');

            const titleElement = document.createElement('h2');
            titleElement.textContent = book.title;
            titleElement.classList.add('book__title')
            articleElement.append(titleElement);

            const authorElement = document.createElement('p');
            authorElement.textContent = book.author;
            authorElement.classList.add('book__author');
            articleElement.append(authorElement);

            booksWrapper.appendChild(articleElement);
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




