import NotesManager from './notesManager';
import Note from './note';
import NoteItem from './note-item';
import Section from './section';
import { sortMethodInput, searchInput, noteForm, titleInput, contentInput, targetDateInput, bgColorInput, deleteAllButton } from './constants';

const notesManager = new NotesManager();
const noteTemplate = document.getElementById('note-template') as HTMLTemplateElement;
const notesSection = new Section<Note>(
  (note) => {
    const noteItem = new NoteItem(note, noteTemplate);
    const deleteButton = noteItem.element.querySelector('.delete-note');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        notesManager.deleteNote(note);
        renderNotes();
      });
    }
    return noteItem.element;
  },
  '#notes-display'
);

function renderNotes() {
  const notes = notesManager.sortNotes(sortMethodInput.value);
  const searchQuery = searchInput.value;
  const filteredNotes = searchQuery
    ? notesManager.searchNotes(searchQuery)
    : notes;
  notesSection.render(filteredNotes);
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const content = contentInput.value;
  const targetDate = targetDateInput.value
    ? new Date(targetDateInput.value)
    : null;
  const bgColor = bgColorInput.value;
  const note = new Note(title, content, targetDate, bgColor);
  notesManager.addNote(note);
  noteForm.reset();
  renderNotes();
});

searchInput.addEventListener('input', renderNotes);
sortMethodInput.addEventListener('change', renderNotes);

deleteAllButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all notes?')) {
    notesManager.deleteAllNotes();
    renderNotes();
  }
});

// Initial render
renderNotes();