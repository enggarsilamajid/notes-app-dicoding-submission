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

  // Hide list elements
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
      await Utils.withLoading(loadingElement, async () => {
        await NotesData.addNote(event.detail);
      });

      cleanup();
      returnToList();

    } catch (error) {
      console.error('Failed to add new note:', error);
      alert('Failed to add new note');
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