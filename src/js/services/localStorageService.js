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
  },

  deleteObjectFieldsFromLocalStorage(object, objectName){
    const key =  `${objectName}-${object.id}`; // ex 'task-1'
    Object.keys(object).forEach((objectField) => {
      if (objectField !== 'id' && localStorage.getItem(`${key}-${objectField}`)) {
        localStorage.removeItem(`${key}-${objectField}`);
      }
    });
  }
};

export default LocalStorageService;
