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
  // Sembunyikan elemen list
  searchBar.classList.add('view-hidden');
  titleSection.classList.add('view-hidden');
  Utils.hideElement(noteList);
  Utils.hideElement(notFound);

  const detail = document.createElement('note-detail');
  detail.note = note;
  detail.id = 'noteDetailView';

  container.appendChild(detail);

  // ==========================
  // TOGGLE ARCHIVE (FIXED)
  // ==========================
  const toggleArchiveHandler = async (event) => {
    const { id } = event.detail;

    try {
      Utils.showLoading();

      const currentNote = NotesData.getNoteById(id);

      if (!currentNote) {
        throw new Error('Note tidak ditemukan');
      }

      // kirim status archived saat ini
      await NotesData.toggleArchive(id, currentNote.archived);

      // fetch ulang agar sinkron
      await NotesData.fetchNotes();

      cleanup();
      returnToList();

    } catch (error) {
      console.error('Gagal toggle archive:', error);
    } finally {
      Utils.hideLoading();
    }
  };

  // ==========================
  // BACK BUTTON
  // ==========================
  const backHandler = () => {
    cleanup();
    returnToList();
  };

  // ==========================
  // CLEANUP
  // ==========================
  const cleanup = () => {
    document.removeEventListener('toggle-archive', toggleArchiveHandler);
    document.removeEventListener('back-to-list', backHandler);

    const existingDetail = document.querySelector('#noteDetailView');
    if (existingDetail) existingDetail.remove();
  };

  // ==========================
  // EVENT LISTENER
  // ==========================
  document.addEventListener('toggle-archive', toggleArchiveHandler);
  document.addEventListener('back-to-list', backHandler);
};

export default renderDetail;