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

  const loadingElement =
    noteListContainerElement.querySelector('loading-indicator');

  const showLoading = () => {
    hideAllChildren();
    if (loadingElement) {
      Utils.showElement(loadingElement);
    }
  }

  const hideAllChildren = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
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
    const active = query
      ? NotesData.searchNote(query)
      : NotesData.getActive();

    const archived = NotesData.getArchived();

    if (active.length === 0 && archived.length === 0) {
      showNotFound();
      return;
    }

    Utils.emptyElement(noteListElement);

    const activeItems = active.map(note => {
      const el = document.createElement('note-item');
      el.note = note;
      el.slot = 'active';
      return el;
    });

    const archivedItems = archived.map(note => {
      const el = document.createElement('note-item');
      el.note = note;
      el.slot = 'archived';
      return el;
    });

    noteListElement.append(...activeItems, ...archivedItems);

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
      showLoading();
      await NotesData.fetchNotes();
      showNotes();
    } catch (error) {
      console.error('Failed to get data from API', error);
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