import Note from "./note";

class NoteItem {
    note: Note;
    element: HTMLLIElement;

    constructor(note: Note, templateElement: HTMLTemplateElement) {
        this.note = note;
        const node = document.importNode(templateElement.content, true);
        this.element = node.firstElementChild as HTMLLIElement;

        // Set note values
        this.element!.style.backgroundColor = this.note.bgColor;
        this.element.querySelector('h4')!.textContent = this.note.title;
        this.element.querySelector('.content')!.textContent = this.note.content;
        if (this.note.targetDate) {
            this.element.querySelector('.target-date')!.textContent = `Target Date: ${this.note.targetDate.toLocaleString().split('T')[0]}`;
        } else {
            this.element.querySelector('.target-date')!.textContent = ''
        }
        this.element.querySelector('.creation-date')!.textContent = `Creation Date: ${this.note.creationDate.toLocaleString().split('T')[0]}`;
    }
}

export default NoteItem;