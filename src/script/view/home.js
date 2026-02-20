import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const home = () => {
  const searchFormElement = document.querySelector('search-bar');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteQueryWaitingElement = noteListContainerElement.querySelector('.query-waiting');
  const noteLoadingElement = noteListContainerElement.querySelector('.search-loading');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;
      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showAllNotes = () => {
    showLoading();

    const result = NotesData.getAll();
    displayResult(result);

    showNoteList();
  };

  const showNotesByQuery = (query) => {
    showLoading();

    const result = NotesData.searchNote(query);
    displayResult(result);

    showNoteList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    const { query } = event.detail;
    showNotesByQuery(query);
  };

  searchFormElement.addEventListener('search', onSearchHandler);
  showAllNotes();
};

export default home;