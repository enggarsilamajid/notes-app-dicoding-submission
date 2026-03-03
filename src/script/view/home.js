import Utils from "../utils.js";
import NotesData from "../data/api/notes.js";
import renderDetail from "./detail.js";
import renderAddForm from "./add-note.js";

const home = () => {
  const addNoteButton = document.querySelector("#addNoteBtn");
  const searchBarContainerElement = document.querySelector(
    "#searchBarContainer",
  );
  const titleSectionElement = document.querySelector(".title-section");

  const searchBarElement = document.querySelector("search-bar");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteNotFoundElement =
    noteListContainerElement.querySelector(".not-found");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const hideAllChildren = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
  };

  const showNoteList = () => {
    hideAllChildren();
    Utils.showElement(noteListElement);
  };

  const showNotFound = () => {
    hideAllChildren();
    Utils.showElement(noteNotFoundElement);
  };

  const showNotes = (query = "") => {
    const result = NotesData.searchNote(query);

    if (query && result.length === 0) {
      showNotFound();
      return;
    }

    noteListElement.notes = result;
    showNoteList();
  };

  const onSearchHandler = (event) => {
    const { query } = event.detail;
    showNotes(query);
  };

  const returnToListView = () => {
    searchBarContainerElement.classList.remove("view-hidden");
    titleSectionElement.classList.remove("view-hidden");
    showNotes();
  };

  const init = async () => {
    try {
      Utils.showLoading();
      await NotesData.fetchNotes();
      showNotes();
    } catch (error) {
      console.error("Failed get notes from API", error);
      showNotFound();
    } finally {
      Utils.hideLoading();
    }
  };

  searchBarElement.addEventListener("search", onSearchHandler);
  init();

  document.addEventListener("open-detail", (event) => {
    const noteId = event.detail.id;
    const selectedNote = NotesData.getNoteById(noteId);

    renderDetail({
      note: selectedNote,
      container: noteListContainerElement,
      searchBar: searchBarContainerElement,
      titleSection: titleSectionElement,
      noteList: noteListElement,
      notFound: noteNotFoundElement,
      returnToList: returnToListView,
    });
  });

  addNoteButton.addEventListener("click", () => {
    renderAddForm({
      container: noteListContainerElement,
      searchBar: searchBarContainerElement,
      titleSection: titleSectionElement,
      noteList: noteListElement,
      notFound: noteNotFoundElement,
      returnToList: returnToListView,
    });
  });

  document.addEventListener("delete-note", async (event) => {
  const { id } = event.detail;

  try {
    Utils.showLoading();

    await NotesData.deleteNote(id);
    await NotesData.fetchNotes();

    // Hapus detail view jika ada
    const existingDetail = document.querySelector("#noteDetailView");
    if (existingDetail) existingDetail.remove();

    returnToListView();

  } catch (error) {
    console.error("DELETE ERROR:", error);
    alert("Failed delete note");
  } finally {
    Utils.hideLoading();
  }
});
};

export default home;