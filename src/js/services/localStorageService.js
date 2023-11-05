/* LOCAL STORAGE MODEL
initial settings:
'lang' - app's language (default: 'en')
'city' - city to find weather (default: 'Minsk')
'name' - customer name (default: '')
'volume' - уровень громкости музыки (default: 30)

additional:
'task-1-done' -
'task-1-taskValue'----- добавленные задачи, введенные пользователем.
        Состоят из статуса "сделанности" и собственно задачи

 'currentTrackID' - ID текущего проигрываемого трека
 'isMuted' - выключен ли звук
 'isDoneTasksHide' - спрятаны ли сделанные таски
 'IsBlocksLayoutHidden' - спрятаны ли затемненные подложки у блоков
 'isSourceAPI_bg' - откуда берутся обои для рабочего стола (true - API, false - github)
 'isSourceAPI_q' - откуда берутся цитаты (true - API, false - github)
 'isPlayerVisible' - виден ли плеер (true/false)
 'isWeatherVisible' - видна ли погода (true/false)
 'isClocksVisible' - видны ли часы (true/false)
 'isDateVisible' - видна ли дата (true/false)
 'isGreetingsVisible' - видно ли приветствие (true/false)
 'isToDoVisible' - виден ли туду лист (true/false)
 'isQuotesVisible' - видны ли цитаты (true/false)
 'isLayoutsVisible' - видны ли затемненные подложки (true/false)


* */


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
