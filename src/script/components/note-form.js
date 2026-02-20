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
          color: red;
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
        <h2>Tambah Catatan</h2>

        <input type="text" id="title" placeholder="Judul" />
        <div id="titleError" class="error"></div>

        <textarea id="body" rows="5" placeholder="Isi catatan"></textarea>
        <div id="bodyError" class="error"></div>

        <button id="saveBtn" disabled>Simpan</button>
        <button id="cancelBtn">Batal</button>
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
        titleError.textContent = 'Judul wajib diisi';
        isValid = false;
      } else if (titleInput.value.trim().length < 3) {
        titleError.textContent = 'Minimal 3 karakter';
        isValid = false;
      } else {
        titleError.textContent = '';
      }

      // Body validation
      if (!bodyInput.value.trim()) {
        bodyError.textContent = 'Isi catatan wajib diisi';
        isValid = false;
      } else if (bodyInput.value.trim().length < 5) {
        bodyError.textContent = 'Minimal 5 karakter';
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