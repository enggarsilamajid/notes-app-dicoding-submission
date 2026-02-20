class SearchBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _searchEvent = 'search';

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  connectedCallback() {
    const input = this._shadowRoot.querySelector('input');

    input.addEventListener('input', (event) => {
      const query = event.target.value;

      this.dispatchEvent(
        new CustomEvent(this._searchEvent, {
          detail: { query },
          bubbles: true,
        })
      );
    });
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: inline;
      }

      .floating-form {
        background-color: var(--text);
        padding: 16px;
        border-radius: 5px;
        position: sticky;
        top: 10px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }

      .search-form {
        display: flex;
      }

      .search-form .form-group {
        flex-grow: 1;
        position: relative;
      }

      .search-form .form-group input {
        display: block;
        width: 100%;
        height: 60px;

        padding: 14px 10px 0 10px;
        border-inline: none;
        border-block-start: none;
        border-block-end: 1px solid var(--secondary);
        font-size: 1rem;
      }

      .search-form .form-group input:focus-visible {
        outline: 0;
      }

      .search-form .form-group label {
        line-height: 60px;
        font-size: 1em;
        font-weight: 700;
        color: var(--secondary);
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 20px;
        user-select: none;
        pointer-events: none;
        transition: 150ms all ease-in-out;
      }

      .search-form .form-group input:focus-visible ~ label,
      .search-form .form-group input:not(:placeholder-shown) ~ label {
        left: 10px;
        top: -16px;
        font-size: 0.8em;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="floating-form">
        <div class="search-form">
          <div class="form-group">
            <input id="name" type="search" placeholder=" " />
            <label for="name">Search Note's Title ...</label>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);