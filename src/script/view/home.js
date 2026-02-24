import Utils from '../utils.js';
import NotesData from '../data/api/notes.js';
import renderDetail from './detail.js';
import renderAddForm from './add-note.js';

const home = () => {
  const addNoteButton = document.querySelector('#addNoteBtn');
  const searchBarContainerElement = document.querySelector('#searchBarContainer');
  const titleSectionElement = document.querySelector('.title-section');

  const searchBarElement = document.querySelector('search-bar');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteNotFoundElement =
    noteListContainerElement.querySelector('.not-found');
  const noteListElement =
    noteListContainerElement.querySelector('note-list');

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

  const returnToListView = () => {
    searchBarContainerElement.classList.remove('view-hidden');
    titleSectionElement.classList.remove('view-hidden');

    showNotes();
  };

  // Initial load
  const init = async () => {
    try {
      await NotesData.fetchNotes();
      showNotes();
    } catch (error) {
      console.error('Gagal mengambil data dari API', error);
      showNotFound();
    }
  };

  searchBarElement.addEventListener('search', onSearchHandler);

  init();

  // Open Detail
  document.addEventListener('open-detail', (event) => {
    const noteId = event.detail.id;
    const selectedNote = NotesData.getNoteById(noteId);

    renderDetail({
      note: selectedNote,
      container: noteListContainerElement,
      searchBar: searchBarContainerElement,
      titleSection: titleSectionElement,
      noteList: noteListElement,
      notFound: noteNotFoundElement,
      returnToList: returnToListView,
    });
  });

  // Open Add Form
  addNoteButton.addEventListener('click', () => {
    renderAddForm({
      container: noteListContainerElement,
      searchBar: searchBarContainerElement,
      titleSection: titleSectionElement,
      noteList: noteListElement,
      notFound: noteNotFoundElement,
      returnToList: returnToListView,
    });
  });
};

export default home;