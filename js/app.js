var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks } from "./api.js";
import { createSearchContainerWithInput, createBooksWrapper, createMainTitle } from "./elementBuilders.js";
import { createSearchButton, createShowAllButton } from "./search.js";
import { updateMainTitle } from "./updateTitle.js";
const apiUrl = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
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
