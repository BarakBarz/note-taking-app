import NotesManager from './notesManager';
import Note from './note';
import { notesDisplay, sortMethodInput, searchInput, noteForm, titleInput, contentInput, targetDateInput, bgColorInput, deleteAllButton } from './constants';

const notesManager = new NotesManager();

function renderNotes() {
  notesDisplay.textContent = '';
  const notes = notesManager.sortNotes(sortMethodInput.value);
  const searchQuery = searchInput.value;
  const filteredNotes = searchQuery
    ? notesManager.searchNotes(searchQuery)
    : notes;
  filteredNotes.forEach((note, index) => {
    const noteElement: HTMLDivElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.style.backgroundColor = note.bgColor;
    noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <p>Target date: ${
              note.targetDate ? note.targetDate.toDateString() : 'N/A'
            }</p>
            <p>Creation date: ${note.creationDate.toDateString()}</p>
            <button class="delete-note">Delete</button>
        `;
    const deleteButton = noteElement.querySelector('.delete-note');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        notesManager.deleteNote(index);
        renderNotes();
      });
    }
    notesDisplay.appendChild(noteElement);
  });
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

