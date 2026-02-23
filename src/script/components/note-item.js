class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  render() {
    if (!this._note) return;

    const { id, title, body, createdAt, archived } = this._note;

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          padding: 16px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .title {
          font-weight: bold;
          margin-bottom: 8px;
        }

        .date {
          font-size: 12px;
          color: gray;
          margin-bottom: 8px;
        }

        .archived {
          font-size: 11px;
          color: red;
        }
      </style>

      <div class="card">
        <div class="title">${title}</div>
        <div class="date">${new Date(createdAt).toLocaleString()}</div>
        <div>${body.slice(0, 100)}...</div>
        ${archived ? `<div class="archived">Archived</div>` : ''}
      </div>
    `;

    this.shadowRoot
      .querySelector('.card')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('open-detail', {
            detail: { id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);