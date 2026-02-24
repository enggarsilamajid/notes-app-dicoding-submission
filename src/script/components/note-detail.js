import Utils from '../utils.js';

class NoteDetail extends HTMLElement {
  _shadowRoot = null;
  _note = null;

  set note(value) {
    this._note = value;
    this.render();
  }
  
  get note() {
    return this._note;
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        .container {
          padding: 20px;
        }

        button {
          margin-top: 20px;
          padding: 8px 16px;
          cursor: pointer;
        }
      </style>

      <div class="container">
        <h2>${this._note.title}</h2>
        <p>${Utils.formatDate(this._note.createdAt)}</p>
        <p>${this._note.body}</p>

        <button class="archive-btn">
          ${this._note.archived ? 'Unarchive' : 'Archive'}
        </button>

        <button class="delete-btn">Delete</button>

        <button class="back-btn">Back</button>
      </div>
    `;

    this._shadowRoot
      .querySelector('.archive-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('toggle-archive', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });

    this._shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', () => {
        document.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: this.note.id },
          })
        );
      });

    this._shadowRoot
      .querySelector('.back-btn')
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