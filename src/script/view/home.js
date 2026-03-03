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

  const showNoteList = () => {
    hideAllChildren();
    Utils.showElement(noteListElement);
  };

  const showNotFound = () => {
    hideAllChildren();
    Utils.showElement(noteNotFoundElement);
  };

  const renderSeparatedNotes = (notes) => {
  Utils.emptyElement(noteListElement);

  if (!notes) {
    showNotFound();
    return;
  }

  const activeNotes = notes.filter(note => !note.archived);
  const archivedNotes = notes.filter(note => note.archived);

  const activeSection = document.createElement('div');

  const activeTitle = document.createElement('h3');
  activeTitle.textContent = 'Active Notes';
  activeSection.appendChild(activeTitle);

  if (activeNotes.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No active notes';
    emptyMessage.classList.add('empty-message');
    activeSection.appendChild(emptyMessage);
  } else {
    activeNotes.forEach(note => {
      const item = document.createElement('note-item');
      item.note = note;
      activeSection.appendChild(item);
    });
  }

  noteListElement.appendChild(activeSection);

  const archivedSection = document.createElement('div');

  const archivedTitle = document.createElement('h3');
  archivedTitle.textContent = 'Archived Notes';
  archivedSection.appendChild(archivedTitle);

  if (archivedNotes.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No archived notes';
    emptyMessage.classList.add('empty-message');
    archivedSection.appendChild(emptyMessage);
  } else {
    archivedNotes.forEach(note => {
      const item = document.createElement('note-item');
      item.note = note;
      archivedSection.appendChild(item);
    });
  }

  noteListElement.appendChild(archivedSection);

  showNoteList();
};

  const showNotes = (query = '') => {
    const result = NotesData.searchNote(query);

    if (query && result.length === 0) {
      showNotFound();
      return;
    }

    renderSeparatedNotes(result);
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

  const init = async () => {
    try {
      Utils.showLoading();

      await NotesData.fetchNotes();
      showNotes();
    } catch (error) {
      console.error('Gagal mengambil data dari API', error);
      showNotFound();
    } finally {
      Utils.hideLoading();
    }
  };

  searchBarElement.addEventListener('search', onSearchHandler);

  init();

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