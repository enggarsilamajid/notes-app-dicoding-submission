import NotesData from '../api/notes.js';

async function loadNotes() {
  try {
    const notes = await NotesApi.getNotes();

    const noteListElement = document.querySelector('note-list');
    noteListElement.notes = notes;

  } catch (error) {
    console.error('Gagal mengambil data', error);
  }
}

document.addEventListener('DOMContentLoaded', loadNotes);