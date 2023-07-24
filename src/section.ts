class Section<T> {
    private renderFunction: (item: T) => HTMLElement;
    private container: HTMLElement;
  
    constructor(renderFunction: (item: T) => HTMLElement, containerSelector: string) {
        this.renderFunction = renderFunction;
        this.container = document.querySelector(containerSelector)!;
    }
  
    render(items: T[]) {
        this.container.textContent = '';
        let count = 0;
        for (let item of items) {
            const newItem = this.renderFunction(item);
            this.container.append(newItem);
        }
    }

}

export default Section;