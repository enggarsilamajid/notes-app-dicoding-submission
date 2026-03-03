import Utils from '../utils.js';

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _notes = [];
  _column = 2;
  _gutter = 16;

  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  set notes(value) {
    this._notes = value || [];
    this.render();
  }

  get notes() {
    return this._notes;
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;
    this._column = newValue;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;
    this._gutter = newValue;
  }

  get gutter() {
    return this._gutter;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      h3 {
        margin-top: 24px;
        margin-bottom: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid #6366f1;
      }

      .empty-message {
        font-style: italic;
        color: #777;
        margin-bottom: 16px;
      }

      .section {
        margin-bottom: 32px;
      }

      .list {
        display: grid;
        grid-template-columns: ${'1fr '.repeat(this.column)};
        gap: ${this.gutter}px;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _renderSection(title, notes, emptyMessage) {
    const section = document.createElement('div');
    section.classList.add('section');

    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);

    if (notes.length === 0) {
      const emptyText = document.createElement('p');
      emptyText.textContent = emptyMessage;
      emptyText.classList.add('empty-message');
      section.appendChild(emptyText);
    } else {
      const grid = document.createElement('div');
      grid.classList.add('list');

      notes.forEach(note => {
        const item = document.createElement('note-item');
        item.note = note;
        grid.appendChild(item);
      });

      section.appendChild(grid);
    }

    return section;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    const container = document.createElement('div');

    const activeNotes = this._notes.filter(note => !note.archived);
    const archivedNotes = this._notes.filter(note => note.archived);

    const activeSection = this._renderSection(
      'Active Notes',
      activeNotes,
      'No active notes'
    );

    const archivedSection = this._renderSection(
      'Archived Notes',
      archivedNotes,
      'No archived notes'
    );

    container.appendChild(activeSection);
    container.appendChild(archivedSection);

    this._shadowRoot.appendChild(container);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define('note-list', NoteList);