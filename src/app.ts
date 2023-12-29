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

        const sectionElement = document.createElement('section');
        sectionElement.classList.add('book-section');

        books.forEach(book => {
            const articleElement = document.createElement('article');
            articleElement.classList.add('book');

            const titleElement = document.createElement('h2');
            titleElement.textContent = book.title;
            titleElement.classList.add('book-title')
            articleElement.append(titleElement);

            const authorElement = document.createElement('p');
            authorElement.textContent = book.author;
            authorElement.classList.add('book-author');
            articleElement.append(authorElement);

            sectionElement.appendChild(articleElement);
        })

        document.body.appendChild(sectionElement);

        const mainTitle = document.createElement('h1');
        mainTitle.textContent = `${books.length} Classic Childrens books`;
        document.body.insertBefore(mainTitle,sectionElement)

        console.log("Books:", books);
    } catch (error) {
 
        console.error("Error message:", error.message);
    }
})();




