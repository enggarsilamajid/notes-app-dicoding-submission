const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    return result.data;
  },

  async addNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body })
    });

    const result = await response.json();
    return result.data;
  },

  async deleteNote(id) {
    await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE'
    });
  },

  async archiveNote(id) {
    await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST'
    });
  },

  async unarchiveNote(id) {
    await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST'
    });
  }
};

export default NotesApi;