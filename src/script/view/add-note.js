import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const renderAddForm = ({
  container,
  searchBar,
  titleSection,
  noteList,
  notFound,
  returnToList,
}) => {
  // Hide list related elements
  Utils.hideElement(searchBar);
  Utils.hideElement(titleSection);
  Utils.hideElement(noteList);
  Utils.hideElement(notFound);

  const form = document.createElement('note-form');
  form.id = 'noteFormView';

  container.appendChild(form);

  const addHandler = (event) => {
    NotesData.addNote(event.detail);
    cleanup();
    returnToList();
  };

  const cancelHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener('add-note', addHandler);
    document.removeEventListener('cancel-add-note', cancelHandler);

    const existingForm = document.querySelector('#noteFormView');
    if (existingForm) existingForm.remove();
  };

  document.addEventListener('add-note', addHandler);
  document.addEventListener('cancel-add-note', cancelHandler);
};

export default renderAddForm;