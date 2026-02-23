import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';
import renderDetail from './detail.js';
import renderAddForm from './add-note.js';

const createStore = () => {
  let state = {
    filter: 'active',
    query: '',
  };

  return {
    getState: () => state,

    setState: (newState) => {
      state = {
        ...state,
        ...newState,
      };
    },
  };
};

const home = () => {
  const store = createStore();

  const addNoteButton = document.querySelector('#addNoteBtn');
  const searchBarContainerElement = document.querySelector('#searchBarContainer');
  const titleSectionElement = document.querySelector('.title-section');

  const noteFilterElement = document.querySelector('note-filter');

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

  const render = () => {
    const { filter, query } = store.getState();

    let notes;

    if (filter === 'active') {
      notes = NotesData.getActiveNotes();
    } else {
      notes = NotesData.getArchivedNotes();
    }

    if (query) {
      notes = notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (notes.length === 0) {
      showNotFound();
      return;
    }

    displayResult(notes);
    showNoteList();
  };

  const onSearchHandler = (event) => {
    const { query } = event.detail;

    store.setState({
      query,
    });

    render();
  };

  const returnToListView = () => {
    searchBarContainerElement.classList.remove('view-hidden');
    titleSectionElement.classList.remove('view-hidden');

    render();
  };

  // Initial load
  searchBarElement.addEventListener('search', onSearchHandler);
  render();

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

  // Change display active notes or archived notes
  noteFilterElement.addEventListener('filter-change', (event) => {
    store.setState({
      filter: event.detail.filter,
    });

    render();
  });
};

export default home;