class NoteFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.active = 'active';
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
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        button.active {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }
      </style>

      <div class="filter-container">
        <button id="activeBtn" class="${this.active === 'active' ? 'active' : ''}">
          Active
        </button>

        <button id="archivedBtn" class="${this.active === 'archived' ? 'active' : ''}">
          Archived
        </button>
      </div>
    `;

    this.shadowRoot.querySelector('#activeBtn')
      .addEventListener('click', () => this.changeFilter('active'));

    this.shadowRoot.querySelector('#archivedBtn')
      .addEventListener('click', () => this.changeFilter('archived'));
  }

  changeFilter(type) {
    this.active = type;

    this.dispatchEvent(
      new CustomEvent('filter-change', {
        detail: { filter: type },
        bubbles: true,
        composed: true,
      })
    );

    this.render();
  }
}

customElements.define('note-filter', NoteFilter);