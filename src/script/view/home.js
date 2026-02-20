import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const home = () => {
  const searchFormElement = document.querySelector('search-bar');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector('.search-loading');
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

  const showLoading = () => {
    hideAllChildren();
    Utils.showElement(noteLoadingElement);
  };

  const showNotFound = () => {
    hideAllChildren();
    Utils.showElement(noteNotFoundElement);
  };

  const showNotes = (query = '') => {
    showLoading();

    const result = NotesData.searchNote(query);

    if (result.length === 0) {
      showNotFound();
      return;
    }

    displayResult(result);
    showNoteList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    const { query } = event.detail;
    showNotes(query);
  };

  searchFormElement.addEventListener('search', onSearchHandler);
  showNotes();
};

export default home;