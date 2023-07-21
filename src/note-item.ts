import Note from "./note";
class NoteItem {
    note: Note;
    element: HTMLLIElement;

    constructor(note: Note, templateElement: HTMLTemplateElement) {
        this.note = note;
        this.element = this.createNoteElement(templateElement);
    }

    private createNoteElement(templateElement: HTMLTemplateElement): HTMLLIElement {
        const node = document.importNode(templateElement.content, true);
        const element = node.firstElementChild as HTMLLIElement;

        element.style.backgroundColor = this.note.bgColor;
        this.setTextContent(element, 'h4', this.note.title);
        this.setTextContent(element, '.content', this.note.content);
        this.setTextContent(element, '.target-date', this.formatDate(this.note.targetDate, 'Target Date'));
        this.setTextContent(element, '.creation-date', this.formatDate(this.note.creationDate, 'Creation Date'));

        return element;
    }

    private setTextContent(element: HTMLElement, selector: string, text: string) {
        const childElement = element.querySelector(selector);
        if (childElement) {
            childElement.textContent = text;
        }
    }

    private formatDate(date: Date | null, label: string): string {
        return date ? `${label}: ${date.toLocaleString().split(',')[0]}` : '';
    }
}

export default NoteItem;