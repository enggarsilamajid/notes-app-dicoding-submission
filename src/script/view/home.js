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

  // 🔥 TAMPILKAN ACTIVE & ARCHIVED TERPISAH
  const renderSeparatedNotes = (notes) => {
    Utils.emptyElement(noteListElement);

    if (!notes || notes.length === 0) {
      showNotFound();
      return;
    }

    const activeNotes = notes.filter(note => !note.archived);
    const archivedNotes = notes.filter(note => note.archived);

    // Active Section
    if (activeNotes.length > 0) {
      const activeTitle = document.createElement('h3');
      activeTitle.textContent = 'Active Notes';
      noteListElement.appendChild(activeTitle);

      activeNotes.forEach(note => {
        const item = document.createElement('note-item');
        item.note = note;
        noteListElement.appendChild(item);
      });
    }

    // Archived Section
    if (archivedNotes.length > 0) {
      const archivedTitle = document.createElement('h3');
      archivedTitle.textContent = 'Archived Notes';
      noteListElement.appendChild(archivedTitle);

      archivedNotes.forEach(note => {
        const item = document.createElement('note-item');
        item.note = note;
        noteListElement.appendChild(item);
      });
    }

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

  // 🔥 INITIAL LOAD — LANGSUNG TAMPIL DUA SECTION
  const init = async () => {
    try {
      Utils.showLoading();

      await NotesData.fetchNotes();
      showNotes(); // tanpa query → tampil semua terpisah
    } catch (error) {
      console.error('Gagal mengambil data dari API', error);
      showNotFound();
    } finally {
      Utils.hideLoading();
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