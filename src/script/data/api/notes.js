const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesData {
  static _notes = [];

  static async fetchNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();

    this._notes = result.data;
    return this._notes;
  }

  static getAll() {
    return this._notes;
  }

  static searchNote(query) {
    if (!query || query.trim() === '') {
      return this.getAll();
    }

    const loweredQuery = query.toLowerCase().replace(/\s/g, '');

    return this._notes.filter((note) => {
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
}

export default NotesData;