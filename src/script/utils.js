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

  static empty(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  /* static showLoading(loaderElement) {
    if (loaderElement && typeof loaderElement.show === 'function') {
      loaderElement.show();
    }
  } */

  static hideLoading(loaderElement) {
    if (loaderElement && typeof loaderElement.hide === 'function') {
      loaderElement.hide();
    }
  }

  static async withLoading(loaderElement, asyncCallback) {
    try {
      this.showLoading(loaderElement);
      return await asyncCallback();
    } finally {
      this.hideLoading(loaderElement);
    }
  }
}

export default Utils;