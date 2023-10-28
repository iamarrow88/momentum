const LocalStorageService = {
  setItemToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return value;
  },

  getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
  },

  deleteItemFromLocalStorage(key) {
    localStorage.removeItem(key);
    return true;
  },

  clearLocalStorage() {
    localStorage.clear();
    return true;
  },
};

export default LocalStorageService;
