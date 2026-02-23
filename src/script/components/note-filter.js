class NoteFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._filter = 'active'; // ✅ default harus active
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .filter-container {
          display: flex;
          gap: 8px;
        }

        button {
          padding: 6px 12px;
          cursor: pointer;
        }

        .active {
          background-color: #007bff;
          color: white;
        }
      </style>

      <div class="filter-container">
        <button id="activeBtn" class="${this._filter === 'active' ? 'active' : ''}">
          Active
        </button>

        <button id="archivedBtn" class="${this._filter === 'archived' ? 'active' : ''}">
          Archived
        </button>
      </div>
    `;

    this.shadowRoot
      .querySelector('#activeBtn')
      .addEventListener('click', () => {
        this._filter = 'active';
        this.dispatchFilter();
        this.render();
      });

    this.shadowRoot
      .querySelector('#archivedBtn')
      .addEventListener('click', () => {
        this._filter = 'archived';
        this.dispatchFilter();
        this.render();
      });
  }

  dispatchFilter() {
    this.dispatchEvent(
      new CustomEvent('filter-change', {
        detail: { filter: this._filter },
        bubbles: true,
        composed: true, // ✅ WAJIB supaya keluar dari shadow DOM
      })
    );
  }
}

customElements.define('note-filter', NoteFilter);