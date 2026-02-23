import Utils from '../utils.js';
import NotesAPI from '../data/api/notes-api.js';

const renderDetail = ({
  note,
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

  const detail = document.createElement('note-detail');
  detail.note = note;
  detail.id = 'noteDetailView';

  container.appendChild(detail);

  const toggleArchiveHandler = async (event) => {
    container.innerHTML =
      `<loading-indicator></loading-indicator>`;

    try {
      if (note.archived) {
        await NotesAPI.unarchiveNote(event.detail.id);
      } else {
        await NotesAPI.archiveNote(event.detail.id);
      }

      cleanup();
      returnToList();

    } catch (error) {
      container.innerHTML =
        `<p>Gagal mengubah status arsip</p>`;
    }
  };

  const backHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener('toggle-archive', toggleArchiveHandler);
    document.removeEventListener('back-to-list', backHandler);

    const existingDetail =
      document.querySelector('#noteDetailView');
    if (existingDetail) existingDetail.remove();
  };

  document.addEventListener('toggle-archive', toggleArchiveHandler);
  document.addEventListener('back-to-list', backHandler);
};

export default renderDetail;