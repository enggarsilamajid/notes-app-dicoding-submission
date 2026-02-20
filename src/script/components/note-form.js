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
        .form-container {
          padding: 20px;
        }

        input, textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 12px;
        }

        button {
          padding: 8px 16px;
          cursor: pointer;
        }
      </style>

      <div class="form-container">
        <h2>New Note</h2>

        <input type="text" id="title" placeholder="Title" required />
        <textarea id="body" rows="5" placeholder="Body" required></textarea>

        <button id="saveBtn">Save</button>
        <button id="cancelBtn">Cancel</button>
      </div>
    `;

        this.shadowRoot
            .querySelector('#saveBtn')
            .addEventListener('click', () => {
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

        this.shadowRoot
            .querySelector('#cancelBtn')
            .addEventListener('click', () => {
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