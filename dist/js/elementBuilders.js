export function createHTMLElement(elementType, className, textContent) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
export function createButton(className, textContent) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
}
export function createParagraph(className, textContent) {
    const element = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}
