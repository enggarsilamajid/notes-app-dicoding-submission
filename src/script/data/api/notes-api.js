const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesAPI = {
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    return result.data;
  },

  async addNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    return await response.json();
  },

  async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    return await response.json();
  }
};

export default NotesAPI;