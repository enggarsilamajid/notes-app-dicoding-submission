import Utils from '../utils.js';
import NotesData from '../data/api/notes.js';

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

    // Guard safety (walaupun seharusnya tidak undefined lagi)
    if (!updatedNote) {
      returnToList();
      return;
    }

    // 🔥 Ini kunci utamanya
    detail.note = updatedNote;

  } catch (error) {
    console.error(error);
  } finally {
    Utils.hideLoading();
  }
};