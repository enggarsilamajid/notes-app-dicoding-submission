import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const home = () => {
  const searchBarElement = document.querySelector('search-bar');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteNotFoundElement = noteListContainerElement.querySelector('.not-found');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const hideAllChildren = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
  };

  const displayResult = (notes) => {
    Utils.emptyElement(noteListElement);

    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;
      return noteItemElement;
    });

    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    hideAllChildren();
    Utils.showElement(noteListElement);
  };

  const showNotFound = () => {
    hideAllChildren();
    Utils.showElement(noteNotFoundElement);
  };

  const showNotes = (query = '') => {
    const result = NotesData.searchNote(query);

    if (!query) {
      displayResult(result);
      showNoteList();
      return;
    }

    if (result.length === 0) {
      showNotFound();
      return;
    }

    displayResult(result);
    showNoteList();
  };

  const onSearchHandler = (event) => {
    const { query } = event.detail;
    showNotes(query);
  };

  searchBarElement.addEventListener('search', onSearchHandler);
  // ASLI
  // showNotes();

  // tambah
  document.addEventListener('open-detail', (event) => {
    const noteId = event.detail.id;
    const selectedNote = NotesData.getNoteById(noteId);

    renderDetail(selectedNote);
  });

  // tambah
  const renderDetail = (note) => {
    hideAllChildren();

    const detail = document.createElement('note-detail');
    detail.note = note;

    noteListContainerElement.appendChild(detail);
  };

  // tambah
  document.addEventListener('toggle-archive', (event) => {
    const noteId = event.detail.id;

    NotesData.toggleArchive(noteId);

    showNotes();
  });

  // tambah
  document.addEventListener('back-to-list', () => {
  showNotes();
});
};

export default home;