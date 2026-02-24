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

  const deleteHandler = async (event) => {
    try {
      await NotesData.deleteNote(event.detail.id);

      await NotesData.fetchNotes();

      cleanup();
      returnToList();
    } catch (error) {
      console.error('Failed to delete note', error);
      alert('Failed to delete note');
    }
  }

  const toggleArchiveHandler = async (event) => {
    try {
      const noteId = event.detail.id;

      if (note.archived) {
        await NotesData.unarchiveNote(noteId);
      } else {
        await NotesData.archiveNote(noteId);
      }

      await NotesData.fetchNotes();

      cleanup();
      returnToList();
    } catch (error) {
      console.error('Failed to change status', error);
      alert('Failed to change status');
    }
  }

  const backHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener('toggle-archive', toggleArchiveHandler);
    document.removeEventListener('delete-note', deleteHandler);
    document.removeEventListener('back-to-list', backHandler);

    const existingDetail = document.querySelector('#noteDetailView');
    if (existingDetail) existingDetail.remove();
  };

  document.addEventListener('toggle-archive', toggleArchiveHandler);
  document.addEventListener('delete-note', deleteHandler);
  document.addEventListener('back-to-list', backHandler);
};

export default renderDetail;