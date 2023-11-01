import localStorageService from "../services/localStorageService.js";
import stylesActions from "../services/stylesActions.js";

export default class Settings {
  constructor(lang, translateMap) {
    this.lang = lang;
    this.translateMap = translateMap;
    this.blocksToTranslate = [];
  }

  startSettings() {
    this.setUp();
    this.translatePage(this.lang);
  }

  setUp() {
    this.blocksToTranslate = document.querySelectorAll("[data-translate]");
  }

  translatePage(lang) {
    this.blocksToTranslate.forEach((block) => {
      const translateMarker = block.dataset.translate;
      block.innerHTML = this.translateMap[lang][translateMarker];
    });
  }

  /*toggleDisplayedButtonName(eventTarget){
    const fullDataset = eventTarget.dataset.translate.split('-')
    let templateDataset = fullDataset.slice(0, 2).join('-');
    const action = fullDataset[2] === 'on' ? 'off' : 'on';
    console.log(templateDataset, action);

    eventTarget.dataset.translate = templateDataset + action;

  }*/

  settingsClicks(event){
    const showBlock = stylesActions.changeStyle.bind({
      "classToRemove": "invisible-block",
      "newClass": "visible-block"
    });

    const hideBlock = stylesActions.changeStyle.bind({
      "classToRemove": "visible-block",
      "newClass": "invisible-block"
    });

    const field = event.target.dataset.action;

    switch (field) {
      case "slide-prev":
        console.log("предыдущий слайд");

        break;
      case "slide-next":
        console.log("следующий слайд");
        break;
      case "settings-change-lang-ru":
        console.log("сменить язык на русский");

        options.settings.translatePage(
            localStorageService.setItemToLocalStorage("lang", "ru"),
        );
        break;
      case "settings-change-lang-en":
        console.log("сменить язык на английский");

        options.settings.translatePage(
            localStorageService.setItemToLocalStorage("lang", "en"),
        );
        break;
      case "settings-edit-data-btn":
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*обновить страницу*/
        break;
      case "settings-name":
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*обновить страницу*/
        break;
      case "settings-city":
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*обновить страницу*/
        break;
      case "settings-remove-data-btn":
        console.log("удалить все данные пользователя из локал сторадж");
        localStorageService.clearLocalStorage();
        /*обновить страницу*/
        break;
      case "hide-player-on":
        console.log("спрятать плейер");
        hideBlock('.player');
        /*oldDatasetName = 'hide-player-on';
        newDatasetName = 'hide-player-off';*/
        /*htmlCodeChange.datasetChange()*/
        break;
      case "hide-player-off":
        console.log("показать плейер");
        showBlock('.player');
        /*oldDatasetName = 'hide-player-off';
        newDatasetName = 'hide-player-on';*/
        break;
      case "hide-weather-on":
        console.log("спрятать погоду");
        hideBlock('.weather');
        /*oldDatasetName = 'hide-weather-on';
        newDatasetName = 'hide-weather-off';*/
        break;
      case "hide-weather-off":
        console.log("показать блок с погодой");
        showBlock('.weather');
        /*oldDatasetName = 'hide-weather-off';
        newDatasetName = 'hide-weather-on';*/
        break;
      case "hide-clocks-on":
        console.log("спрятать блок с часами");
        hideBlock('.time');
        /*oldDatasetName = 'hide-clocks-on';
        newDatasetName = 'hide-clocks-off';*/
        break;
      case "hide-clocks-off":
        console.log("показать блок с часами");
        showBlock('.time');
        /*oldDatasetName = 'hide-clocks-off';
        newDatasetName = 'hide-clocks-on';*/
        break;
      case "hide-date-on":
        console.log("спрятать блок с датой");
        hideBlock('.date');
        /*oldDatasetName = 'hide-date-on';
        newDatasetName = 'hide-date-off';*/
        break;
      case "hide-date-off":
        console.log("показать блок с датой");
        showBlock('.date');
        /*oldDatasetName = 'hide-date-off';
        newDatasetName = 'hide-date-on';*/
        break;
      case "hide-greetings-on":
        console.log("спрятать блок с приветствием");
        hideBlock('.greeting-container');
        /*oldDatasetName = 'hide-greetings-on';
        newDatasetName = 'hide-greetings-off';*/
        break;
      case "hide-greetings-off":
        console.log("показать блок с приветствием");
        showBlock('.greeting-container');
        /*oldDatasetName = 'hide-greetings-off';
        newDatasetName = 'hide-greetings-on';*/
        break;
      case "hide-todo-on":
        console.log("спрятать блок со списком дел");
        hideBlock('.motivation-block');
        /*oldDatasetName = 'hide-todo-on';
        newDatasetName = 'hide-todo-off';*/
        break;
      case "hide-todo-off":
        console.log("показать блок со списком дел");
        showBlock('.motivation-block');
        /*oldDatasetName = 'hide-player-off';
        newDatasetName = 'hide-player-on';*/
        break;
      case "hide-quotes-on":
        console.log("спрятать блок с цитатами");
        hideBlock('.quote');
        /*oldDatasetName = 'hide-player-on';
        newDatasetName = 'hide-player-off';*/
        break;
      case "hide-quotes-off":
        console.log("показать блок с цитатами");
        showBlock('.quote');
        /*oldDatasetName = 'hide-player-off';
        newDatasetName = 'hide-player-on';*/
        break;
      case "hide-layouts-on":
        console.log("показать подложки под блоки");
        options.background.blockLayoutsAction('on');

        break;
      case "hide-layouts-off":
        console.log("скрыть подлоки под блоками");
        options.background.blockLayoutsAction('off');

        break;
      case "settings-hide-background-api":
        console.log("выбрать источником обоев API");
        options.background._isAPISource = true;
        localStorageService.setItemToLocalStorage('isSourceAPI_bg', true);
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
      case "settings-hide-background-github":
        console.log("выбрать источником обоев github");
        options.background._isAPISource = false;
        localStorageService.setItemToLocalStorage('isSourceAPI_bg', false);
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
    }
  }
}
