class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input, textarea {
          padding: 8px;
          font-size: 14px;
        }

        button {
          padding: 8px 12px;
          cursor: pointer;
        }
      </style>

      <form id="form">
        <input type="text" id="title" placeholder="Judul" required />
        <textarea id="body" placeholder="Isi catatan" required></textarea>

        <div>
          <button type="submit">Tambah</button>
          <button type="button" id="cancelBtn">Batal</button>
        </div>
      </form>
    `;

    const form = this.shadowRoot.querySelector('#form');
    const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = this.shadowRoot.querySelector('#title').value;
      const body = this.shadowRoot.querySelector('#body').value;

      this.dispatchEvent(
        new CustomEvent('add-note', {
          detail: { title, body },
          bubbles: true,
          composed: true,
        })
      );
    });

    cancelBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('cancel-add-note', {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define('note-form', NoteForm);