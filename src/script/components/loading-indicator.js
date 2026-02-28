class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.updateVisibility();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          text-align: center;
          padding: 40px 0;
        }

        :host([active]) {
          display: block;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #ddd;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        p {
          font-size: 14px;
          color: #666;
        }
      </style>

      <div class="spinner"></div>
      <p>Processing...</p>
    `;
  }

  updateVisibility() {
    // otomatis di-handle oleh CSS attribute selector
  }

  show() {
    this.setAttribute('active', '');
  }

  hide() {
    this.removeAttribute('active');
  }
}

customElements.define('loading-indicator', LoadingIndicator);