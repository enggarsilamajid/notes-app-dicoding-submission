class Utils {
  static showElement(element) {
    if (element) {
      element.style.display = '';
    }
  }

  static hideElement(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  // 🔥 GANTI nama method jadi emptyElement
  static emptyElement(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  static isValidInteger(value) {
    return Number.isInteger(value);
  }
}

export default Utils;