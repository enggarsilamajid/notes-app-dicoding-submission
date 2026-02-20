class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupValidation();
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
          margin-bottom: 4px;
          box-sizing: border-box;
        }

        .error {
          font-size: 12px;
          color: var(--additional);
          margin-bottom: 10px;
          min-height: 14px;
        }

        button {
          padding: 8px 16px;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>

      <div class="form-container">
        <h2>New Note</h2>

        <input type="text" id="title" placeholder="Title" />
        <div id="titleError" class="error"></div>

        <textarea id="body" rows="5" placeholder="Body"></textarea>
        <div id="bodyError" class="error"></div>

        <button id="saveBtn" disabled>Save</button>
        <button id="cancelBtn">Cancel</button>
      </div>
    `;
  }

  setupValidation() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const saveBtn = this.shadowRoot.querySelector('#saveBtn');

    const titleError = this.shadowRoot.querySelector('#titleError');
    const bodyError = this.shadowRoot.querySelector('#bodyError');

    const validate = () => {
      let isValid = true;

      // Title validation
      if (!titleInput.value.trim()) {
        titleError.textContent = 'Title is required';
        isValid = false;
      } else if (titleInput.value.trim().length < 3) {
        titleError.textContent = 'At least 3 characters';
        isValid = false;
      } else {
        titleError.textContent = '';
      }

      // Body validation
      if (!bodyInput.value.trim()) {
        bodyError.textContent = 'Body is required';
        isValid = false;
      } else if (bodyInput.value.trim().length < 5) {
        bodyError.textContent = 'At least 5 characters';
        isValid = false;
      } else {
        bodyError.textContent = '';
      }

      saveBtn.disabled = !isValid;
    };

    // Realtime validation
    titleInput.addEventListener('input', validate);
    bodyInput.addEventListener('input', validate);

    // Submit handler
    saveBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('add-note', {
          detail: {
            title: titleInput.value.trim(),
            body: bodyInput.value.trim(),
          },
          bubbles: true,
          composed: true,
        })
      );
    });

    // Cancel handler
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