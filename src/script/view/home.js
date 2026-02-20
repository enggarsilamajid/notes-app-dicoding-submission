import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const home = () => {
  const addNoteButton = document.querySelector('#addNoteBtn');
  const searchBarContainerElement = document.querySelector('#searchBarContainer');
  const titleSectionElement = document.querySelector('.title-section');

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
  showNotes();

  document.addEventListener('open-detail', (event) => {
    const noteId = event.detail.id;
    const selectedNote = NotesData.getNoteById(noteId);

    renderDetail(selectedNote);
  });

  const renderDetail = (note) => {
    Utils.hideElement(noteListElement);
    Utils.hideElement(noteNotFoundElement);

    Utils.hideElement(searchBarContainerElement);
    Utils.hideElement(titleSectionElement);

    const detail = document.createElement('note-detail');
    detail.note = note;
    detail.id = 'noteDetailView';

    noteListContainerElement.appendChild(detail);
  };

  document.addEventListener('toggle-archive', (event) => {
    const noteId = event.detail.id;

    NotesData.toggleArchive(noteId);

    returnToListView();
  });

  document.addEventListener('back-to-list', () => {
    returnToListView();
  });

  const returnToListView = () => {
    const detail = document.querySelector('#noteDetailView');
    if (detail) detail.remove();

    Utils.showElement(searchBarContainerElement);
    Utils.showElement(titleSectionElement);

    showNotes();
  };

  const renderAddForm = () => {
    Utils.hideElement(searchBarContainerElement);
    Utils.hideElement(titleSectionElement);
    Utils.hideElement(noteListElement);
    Utils.hideElement(noteNotFoundElement);

    const form = document.createElement('note-form');
    form.id = 'noteFormView';

    noteListContainerElement.appendChild(form);
  };

  addNoteButton.addEventListener('click', () => {
    renderAddForm();
  });

  document.addEventListener('add-note', (event) => {
    const { title, body } = event.detail;

    NotesData.addNote({ title, body });

    const form = document.querySelector('#noteFormView');
    if (form) form.remove();

    returnToListView();
  });

  document.addEventListener('cancel-add-note', () => {
    const form = document.querySelector('#noteFormView');
    if (form) form.remove();

    returnToListView();
  });
};

export default home;