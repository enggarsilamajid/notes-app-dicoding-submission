class NoteDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    if (!this._note) return;

    const { id, title, body, createdAt, archived } = this._note;

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          padding: 20px;
        }

        button {
          margin-right: 8px;
          padding: 8px 12px;
          cursor: pointer;
        }
      </style>

      <div class="container">
        <h2>${title}</h2>
        <p><small>${new Date(createdAt).toLocaleString()}</small></p>
        <p>${body}</p>

        <button id="archiveBtn">
          ${archived ? 'Unarchive' : 'Archive'}
        </button>

        <button id="backBtn">Kembali</button>
      </div>
    `;

    this.shadowRoot
      .querySelector('#archiveBtn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('toggle-archive', {
            detail: { id },
            bubbles: true,
            composed: true,
          })
        );
      });

    this.shadowRoot
      .querySelector('#backBtn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('back-to-list', {
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-detail', NoteDetail);