const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesData {
  static _activeNotes = [];
  static _archivedNotes = [];

  /* ========================
     FETCH ALL NOTES
  ========================= */
  static async fetchNotes() {
    try {
      const [activeResponse, archivedResponse] = await Promise.all([
        fetch(`${BASE_URL}/notes`),
        fetch(`${BASE_URL}/notes/archived`),
      ]);

      if (!activeResponse.ok || !archivedResponse.ok) {
        throw new Error('Failed to fetch notes');
      }

      const activeResult = await activeResponse.json();
      const archivedResult = await archivedResponse.json();

      this._activeNotes = activeResult.data || [];
      this._archivedNotes = archivedResult.data || [];

      return {
        active: this._activeNotes,
        archived: this._archivedNotes,
      };
    } catch (error) {
      console.error('Fetch Notes Error:', error);
      throw error;
    }
  }

  static getActive() {
    return this._activeNotes;
  }

  static getArchived() {
    return this._archivedNotes;
  }

  /* ========================
     SEARCH
  ========================= */
  static searchNote(query) {
    if (!query || query.trim() === '') {
      return this.getActive();
    }

    const loweredQuery = query.toLowerCase().replace(/\s/g, '');

    return this.getActive().filter((note) => {
      const loweredTitle = (note.title || '')
        .toLowerCase()
        .replace(/\s/g, '');

      return loweredTitle.includes(loweredQuery);
    });
  }

  static getNoteById(id) {
    return [...this._activeNotes, ...this._archivedNotes]
      .find(note => note.id === id);
  }

  /* ========================
     ADD NOTE
  ========================= */
  static async addNote({ title, body }) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message);
      }

      // Refresh data after mutation
      await this.fetchNotes();

      return result.data;
    } catch (error) {
      console.error('Add Note Error:', error);
      throw error;
    }
  }

  /* ========================
     DELETE NOTE
  ========================= */
  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message);
      }

      await this.fetchNotes();

      return result.message;
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  }

  /* ========================
     ARCHIVE NOTE
  ========================= */
  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to archive note');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message);
      }

      await this.fetchNotes();

      return result.message;
    } catch (error) {
      console.error('Archive Error:', error);
      throw error;
    }
  }

  /* ========================
     UNARCHIVE NOTE
  ========================= */
  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to unarchive note');
      }

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message);
      }

      await this.fetchNotes();

      return result.message;
    } catch (error) {
      console.error('Unarchive Error:', error);
      throw error;
    }
  }
}

export default NotesData;