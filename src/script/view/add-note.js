import Utils from '../utils.js';
import NotesData from '../data/api/notes.js';

const renderAddForm = ({
  container,
  searchBar,
  titleSection,
  noteList,
  notFound,
  returnToList,
}) => {
  // Hide list related elements
  searchBar.classList.add('view-hidden');
  titleSection.classList.add('view-hidden');
  Utils.hideElement(noteList);
  Utils.hideElement(notFound);

  const form = document.createElement('note-form');
  form.id = 'noteFormView';

  container.appendChild(form);
  const loadingElement = container.querySelector('loading-indicator');

  const addHandler = async (event) => {
  try {
    if (loadingElement) loadingElement.show();

    const saveBtn = form.shadowRoot.querySelector('#saveBtn');
    if (saveBtn) saveBtn.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await NotesData.addNote(event.detail);

    await NotesData.fetchNotes();

    cleanup();
    returnToList();
  } catch (error) {
    console.error('Failed to add new note:', error);
    alert('Failed to add new note');
  } finally {
    if (loadingElement) loadingElement.hide();
  }
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