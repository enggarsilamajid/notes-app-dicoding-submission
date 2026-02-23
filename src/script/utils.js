const Utils = {
  hideElement(element) {
    if (!element) return;
    element.hidden = true;
  },

  showElement(element) {
    if (!element) return;
    element.hidden = false;
  },

  emptyElement(element) {
    if (!element) return;
    element.innerHTML = '';
  },
};

export default Utils;