import Note from './note';
import { sortDateAsc, sortDateDesc } from './utilities';

class NotesManager {
  notes: Note[];

  constructor() {
    this.notes = this.getNotesFromLocalStorage();
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveNotesToLocalStorage();
  }

  deleteNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.saveNotesToLocalStorage();
    }
  }

  deleteAllNotes() {
    this.notes = [];
    this.saveNotesToLocalStorage();
  }

  getNotesFromLocalStorage(): Note[] {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    return storedNotes.map((note: any) => ({
      ...note,
      creationDate: new Date(note.creationDate),
      targetDate: note.targetDate ? new Date(note.targetDate) : null,
    }));
  }

  saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  searchNotes(query: string): Note[] {
    return this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()),
    );
  }

  sortNotes(sortMethod: string): Note[] {
    let sortedNotes;
    switch (sortMethod) {
      case 'alphabet':
        sortedNotes = [...this.notes].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        break;
      case 'creation-date-asc':
        sortedNotes = [...this.notes].sort((a, b) =>
          sortDateAsc(a.creationDate, b.creationDate),
        );
        break;
      case 'creation-date-desc':
        sortedNotes = [...this.notes].sort((a, b) =>
          sortDateDesc(a.creationDate, b.creationDate),
        );
        break;
      case 'target-date-asc':
        sortedNotes = [...this.notes]
          .filter((a) => a.targetDate !== null)
          .sort((a, b) => (a.targetDate! < b.targetDate! ? -1 : 1));
        break;
      case 'target-date-desc':
        sortedNotes = [...this.notes]
          .filter((a) => a.targetDate !== null)
          .sort((a, b) => (a.targetDate! < b.targetDate! ? 1 : -1));
        break;
      default:
        sortedNotes = [...this.notes];
    }
    return sortedNotes;
  }
}
export default NotesManager;

