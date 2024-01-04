import { getBooks } from "./api.js";
import { Book } from "./interfaces.js";
import { createSearchContainerWithInput, createBooksWrapper, createMainTitle } from "./elementBuilders.js";
import { createSearchButton, createShowAllButton } from "./search.js";
import { updateMainTitle } from "./updateTitle.js";

const apiUrl: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

//------ Function to fetch and display books
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
