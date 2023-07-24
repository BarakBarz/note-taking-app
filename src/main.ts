import './scss/styles.scss';
import * as bootstrap from 'bootstrap';


import NotesManager from './notes-manager';
import Note from './note';
import NoteRenderer from './note-renderer';
import Section from './section';
import {
  sortMethodInput,
  searchInput,
  noteForm,
  titleInput,
  contentInput,
  targetDateInput,
  bgColorInput,
  deleteAllButton,
  spinnerWrapperElement
} from './constants';

window.addEventListener('load', function () {
spinnerWrapperElement.style.opacity = '0'
setTimeout(() => {
  spinnerWrapperElement.style.display = 'none'
}, 200);
})

const notesManager = new NotesManager();
const noteTemplate = document.getElementById(
  'note-template',
) as HTMLTemplateElement;
const notesSection = new Section<Note>((note) => {
  const noteElement = new NoteRenderer(note, noteTemplate);
  const deleteButton = noteElement.element.querySelector('.delete-note');
  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      notesManager.deleteNote(note);
      renderNotes();
    });
  }
  return noteElement.element;
}, '#notes-display');

function renderNotes(): void {
  notesManager.getNotes.length === 0
    ? (deleteAllButton.disabled = true)
    : (deleteAllButton.disabled = false);
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

deleteAllButton.addEventListener('click', (e) => {
  if (confirm('Are you sure you want to delete all notes?')) {
    notesManager.deleteAllNotes();
    renderNotes();
  }
});

const offcanvasElementList = document.querySelectorAll('.offcanvas');
const offcanvasList = [...offcanvasElementList].map(
  (offcanvasEl) => new bootstrap.Offcanvas(offcanvasEl),
);

// Initial render
renderNotes();

