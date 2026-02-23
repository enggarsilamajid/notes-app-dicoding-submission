const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Terjadi kesalahan pada server');
  }

  return result;
};

const NotesAPI = {
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await handleResponse(response);
    return result.data;
  },

  async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await handleResponse(response);
    return result.data;
  },

  async getNoteById(id) {
    const active = await this.getNotes();
    const archived = await this.getArchivedNotes();
    const allNotes = [...active, ...archived];

    return allNotes.find((note) => note.id === id);
  },

  async addNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    return await handleResponse(response);
  },

  async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    return await handleResponse(response);
  },

  async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    return await handleResponse(response);
  },

  async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    return await handleResponse(response);
  },
};

export default NotesAPI;