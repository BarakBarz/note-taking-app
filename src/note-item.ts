import Note from "./note";

class NoteItem {
    note: Note;
    element: HTMLLIElement;

    constructor(note: Note, templateElement: HTMLTemplateElement) {
        this.note = note;
        const node = document.importNode(templateElement.content, true);
        this.element = node.firstElementChild as HTMLLIElement;

        // Set note values
        this.element.querySelector('div')!.style.backgroundColor = this.note.bgColor;
        this.element.querySelector('h3')!.textContent = this.note.title;
        this.element.querySelector('.content')!.textContent = this.note.content;
        if (this.note.targetDate) {
            this.element.querySelector('.target-date')!.textContent = `Target Date: ${this.note.targetDate.toISOString().split('T')[0]}`;
        }
        this.element.querySelector('.creation-date')!.textContent = `Creation Date: ${this.note.creationDate.toISOString().split('T')[0]}`;
    }
}

export default NoteItem;
