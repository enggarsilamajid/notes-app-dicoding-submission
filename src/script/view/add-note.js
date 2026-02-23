import Utils from '../utils.js';
import NotesAPI from '../data/api/notes-api.js';

const renderAddForm = ({
  container,
  searchBar,
  titleSection,
  noteList,
  notFound,
  returnToList,
}) => {
  searchBar.classList.add('view-hidden');
  titleSection.classList.add('view-hidden');
  Utils.hideElement(noteList);
  Utils.hideElement(notFound);

  const form = document.createElement('note-form');
  form.id = 'noteFormView';

  container.appendChild(form);

  const addHandler = async (event) => {
    const { title, body } = event.detail;

    container.innerHTML =
      `<loading-indicator></loading-indicator>`;

    try {
      await NotesAPI.addNote({ title, body });

      cleanup();
      returnToList();

    } catch (error) {
      container.innerHTML =
        `<p>Gagal menambahkan catatan</p>`;
    }
  };

  const cancelHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener('add-note', addHandler);
    document.removeEventListener('cancel-add-note', cancelHandler);

    const existingForm =
      document.querySelector('#noteFormView');
    if (existingForm) existingForm.remove();
  };

  document.addEventListener('add-note', addHandler);
  document.addEventListener('cancel-add-note', cancelHandler);
};

export default renderAddForm;