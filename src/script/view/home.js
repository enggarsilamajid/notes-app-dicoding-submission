import Utils from '../utils.js';
import NotesAPI from '../data/api/notes-api.js';
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
      state = { ...state, ...newState };
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

  const showLoading = () => {
    hideAllChildren();
    noteListContainerElement.innerHTML =
      `<loading-indicator></loading-indicator>`;
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

  const render = async () => {
    const { filter, query } = store.getState();

    showLoading();

    try {
      let notes =
        filter === 'active'
          ? await NotesAPI.getNotes()
          : await NotesAPI.getArchivedNotes();

      if (query) {
        notes = notes.filter((note) =>
          note.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (!notes || notes.length === 0) {
        showNotFound();
        return;
      }

      displayResult(notes);
      showNoteList();

    } catch (error) {
      noteListContainerElement.innerHTML =
        `<p>Gagal memuat data</p>`;
    }
  };

  const onSearchHandler = (event) => {
    store.setState({ query: event.detail.query });
    render();
  };

  const returnToListView = () => {
    searchBarContainerElement.classList.remove('view-hidden');
    titleSectionElement.classList.remove('view-hidden');
    render();
  };

  searchBarElement.addEventListener('search', onSearchHandler);

  noteFilterElement.addEventListener('filter-change', (event) => {
    store.setState({ filter: event.detail.filter });
    render();
  });

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

  document.addEventListener('open-detail', async (event) => {
    const noteId = event.detail.id;

    showLoading();

    try {
      const selectedNote = await NotesAPI.getNoteById(noteId);

      renderDetail({
        note: selectedNote,
        container: noteListContainerElement,
        searchBar: searchBarContainerElement,
        titleSection: titleSectionElement,
        noteList: noteListElement,
        notFound: noteNotFoundElement,
        returnToList: returnToListView,
      });

    } catch (error) {
      noteListContainerElement.innerHTML =
        `<p>Gagal memuat detail</p>`;
    }
  });

  render();
};

export default home;