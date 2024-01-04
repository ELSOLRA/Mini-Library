export function createHTMLElement(elementType: string, className: string, textContent?: string): HTMLElement {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}

export function createButton(className: string, textContent?: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
  }

export function createParagraph(className: string, textContent?: string): HTMLParagraphElement {
    const element = document.createElement('p');
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}