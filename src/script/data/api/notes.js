const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesData {
  static _activeNotes = [];
  static _archivedNotes = [];

  static async fetchNotes() {
    const [activeResponse, archivedResponse] = await Promise.all([
      fetch(`${BASE_URL}/notes`),
      fetch(`${BASE_URL}/notes/archived`),
    ]);

    const activeResult = await activeResponse.json();
    const archivedResult = await archivedResponse.json();

    this._activeNotes = activeResult.data;
    this._archivedNotes = archivedResult.data;

    return {
      active: this._activeNotes,
      archived: this._archivedNotes,
    };
  }

  static getActive() {
    return this._activeNotes;
  }

  static getArchived() {
    return this._archivedNotes;
  }

  static searchNote(query) {
    const notes = this.getActive();

    if (!query || query.trim() === '') {
      return notes;
    }

    const loweredQuery = query.toLowerCase().replace(/\s/g, '');

    return notes.filter((note) => {
      const loweredTitle = (note.title || '')
        .toLowerCase()
        .replace(/\s/g, '');

      return loweredTitle.includes(loweredQuery);
    });
  }

  static getNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  static async addNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.data;
  }

  static async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.message;
  }

  static async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.message;
  }

  static async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.message;
  }
}

export default NotesData;