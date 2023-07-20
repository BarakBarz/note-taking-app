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
        // let row = this.createRow();
        for (let item of items) {
            const newItem = this.renderFunction(item);
            this.container.append(newItem);
            count++;
            // if (count % 3 === 0) {
            //     row = this.createRow();
            // }
        }
    }

    private createRow(): HTMLDivElement {
        const row = document.createElement('div');
        
        row.className = 'd-flex justify-content-center row';
        this.container.append(row);
        return row;
    }
}

export default Section;