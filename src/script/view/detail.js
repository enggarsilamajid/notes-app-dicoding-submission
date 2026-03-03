import Utils from '../utils.js';
import NotesData from '../data/local/notes.js';

const renderDetail = ({
  note,
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

  const detail = document.createElement('note-detail');
  detail.note = note;
  detail.id = 'noteDetailView';

  container.appendChild(detail);

  const toggleArchiveHandler = (event) => {
    NotesData.toggleArchive(event.detail.id);
    cleanup();
    returnToList();
  };

  const backHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener('toggle-archive', toggleArchiveHandler);
    document.removeEventListener('back-to-list', backHandler);

    const existingDetail = document.querySelector('#noteDetailView');
    if (existingDetail) existingDetail.remove();
  };

  document.addEventListener('toggle-archive', toggleArchiveHandler);
  document.addEventListener('back-to-list', backHandler);
};

export default renderDetail;