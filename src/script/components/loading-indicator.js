class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="padding:20px;text-align:center;">
        <p>Loading...</p>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);