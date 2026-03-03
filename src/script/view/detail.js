import Utils from "../utils.js";
import NotesData from "../data/api/notes.js";

const renderDetail = ({
  note,
  container,
  searchBar,
  titleSection,
  noteList,
  notFound,
  returnToList,
}) => {
  searchBar.classList.add("view-hidden");
  titleSection.classList.add("view-hidden");
  Utils.hideElement(noteList);
  Utils.hideElement(notFound);

  const detail = document.createElement("note-detail");
  detail.note = note;
  detail.id = "noteDetailView";

  container.appendChild(detail);

  const toggleArchiveHandler = async (event) => {
    const { id } = event.detail;

    try {
      Utils.showLoading();

      const currentNote = NotesData.getNoteById(id);

      if (!currentNote) {
        throw new Error("Note is note found");
      }

      await NotesData.toggleArchive(id, currentNote.archived);

      await NotesData.fetchNotes();

      cleanup();
      returnToList();
    } catch (error) {
      console.error("Failed toggle archive:", error);
    } finally {
      Utils.hideLoading();
    }
  };

  document.addEventListener("delete-note", async (event) => {
  const { id } = event.detail;

  try {
    Utils.showLoading();

    await NotesData.deleteNote(id);

    await NotesData.fetchNotes();

    searchBarContainerElement.classList.remove("view-hidden");
    titleSectionElement.classList.remove("view-hidden");

    showNotes();

  } catch (error) {
    console.error("DELETE ERROR:", error);
    alert("Failed delete note");
  } finally {
    Utils.hideLoading();
  }
});

  const backHandler = () => {
    cleanup();
    returnToList();
  };

  const cleanup = () => {
    document.removeEventListener("toggle-archive", toggleArchiveHandler);
    document.removeEventListener("back-to-list", backHandler);

    const existingDetail = document.querySelector("#noteDetailView");
    if (existingDetail) existingDetail.remove();
  };

  document.addEventListener("toggle-archive", toggleArchiveHandler);
  document.addEventListener("back-to-list", backHandler);
};

export default renderDetail;
