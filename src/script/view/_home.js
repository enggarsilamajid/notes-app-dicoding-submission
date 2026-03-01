import Utils from '../utils.js'; 
import NotesData from '../data/api/notes.js';
import renderDetail from './detail.js';
import renderAddForm from './add-note.js';

const home = () => {
  const addNoteButton = document.querySelector('#addNoteBtn');
  const searchBarContainerElement = document.querySelector('#searchBarContainer');
  const titleSectionElement = document.querySelector('.title-section');
  const loadingElement = noteListContainerElement.querySelector('.search-loading');

  const searchBarElement = document.querySelector('search-bar');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteNotFoundElement =
    noteListContainerElement.querySelector('.not-found');
  const noteListElement =
    noteListContainerElement.querySelector('note-list');

  const hideAllChildren = () => {
  Utils.hideElement(noteListElement);
  Utils.hideElement(noteNotFoundElement);
};

  const displayResult = (notes) => {
  noteListElement.innerHTML = notes.map(note => `
    <div style="border:1px solid #ccc; margin:8px; padding:8px;">
      <h3>${note.title}</h3>
      <p>${note.body}</p>
    </div>
  `).join('');
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
    Utils.showElement(loadingElement);

    await NotesData.fetchNotes();

    Utils.hideElement(loadingElement);
    showNotes();
  } catch (error) {
    Utils.hideElement(loadingElement);
    showNotFound();
  }
};

init();

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