import Utils from '../utils.js';
import NotesData from '../data/api/notes.js';

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

  const toggleArchiveHandler = async (event) => {
  const { id } = event.detail;

  try {
    Utils.showLoading();

    const currentNote = NotesData.getNoteById(id);

    await NotesData.toggleArchive(id, currentNote.archived);
    await NotesData.fetchNotes();

    const updatedNote = NotesData.getNoteById(id);

    // 🔥 UPDATE COMPONENT TANPA RENDER ULANG
    detail.note = updatedNote;

  } catch (error) {
    console.error(error);
  } finally {
    Utils.hideLoading();
  }
};

  const backHandler = () => {
    cleanup();
    returnToList();
  };

  document.addEventListener('toggle-archive', toggleArchiveHandler);
  document.addEventListener('back-to-list', backHandler);
};

export default renderDetail;