class Utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  static showLoading() {
    if (!document.querySelector("loading-indicator")) {
      const loader = document.createElement("loading-indicator");
      document.body.appendChild(loader);
    }
  }

  static hideLoading() {
    const loader = document.querySelector("loading-indicator");
    if (loader) loader.remove();
  }
}

export default Utils;
