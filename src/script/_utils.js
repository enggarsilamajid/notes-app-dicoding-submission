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

  static formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
}

export default Utils;