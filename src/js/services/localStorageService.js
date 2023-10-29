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

  setObjectFieldsToLocalStorage(object, objectName) {
    const template = `${objectName}-${object.id}`;

    Object.keys(object).forEach((objectField) => {
      if (
          !localStorage.getItem(`${template}-${objectField}`) &&
          objectField !== "id"
      ) {
        localStorage.setItem(`${template}-${objectField}`, `${object[objectField]}`);
      }
    });
  }
};

export default LocalStorageService;
