export function getMainTitle(bookCount: number): string {
    return bookCount === 1
    ? `${bookCount} Classic Childrens book` 
    : bookCount > 1
    ? `${bookCount} Classic Childrens books` 
    : `Classic Childrens books`;
};

export function updateMainTitle(bookCount: number, mainTitle: HTMLElement) {
    mainTitle.textContent = getMainTitle(bookCount);
};
