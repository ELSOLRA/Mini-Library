export function getMainTitle(bookCount) {
    return bookCount === 1
        ? `${bookCount} Classic Childrens book`
        : bookCount > 1
            ? `${bookCount} Classic Childrens books`
            : `Classic Childrens books`;
}
;
export function updateMainTitle(bookCount, mainTitle) {
    mainTitle.textContent = getMainTitle(bookCount);
}
;
