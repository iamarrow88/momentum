import localStorageService from "../services/localStorageService.js";
import stylesActions from "../services/stylesActions.js";
import {toggleDatasetName} from "../services/transformDataset.js";
import htmlCodeChange from "../services/htmlCodeChange.js";

export default class Settings {
  constructor(lang, langs, translateMap) {
    this.lang = lang;
    this.langs = langs;
    this.savedLang = this.langs.findIndex(lang => lang === this.lang) === 0 ? this.langs[1] : this.langs[0];
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

  translatePage(lang, backgroundApp) {
    if(this.savedLang !== lang) {
      this.savedLang = lang;
      for(let i = 0; i < this.blocksToTranslate.length; i++){
        if(this.blocksToTranslate[i].dataset.translate === 'date') {
          if(backgroundApp){
            backgroundApp.insertDateToHTML();
          }
        } else {
          const translateMarker = this.blocksToTranslate[i].dataset.translate;
          this.blocksToTranslate[i].innerHTML = this.translateMap[lang][translateMarker];
        }

      }
    }
    /*this.blocksToTranslate.forEach((block) => {
      if(block.dataset.translate === 'date' && backgroundApp) {
        backgroundApp.insertDateToHTML();
      }
      const translateMarker = block.dataset.translate;
      block.innerHTML = this.translateMap[lang][translateMarker];
    });*/
  }

  /*toggleDisplayedButtonName(eventTarget){
    const fullDataset = eventTarget.dataset.translate.split('-')
    let templateDataset = fullDataset.slice(0, 2).join('-');
    const action = fullDataset[2] === 'on' ? 'off' : 'on';
    console.log(templateDataset, action);

    eventTarget.dataset.translate = templateDataset + action;

  }*/


  /*const options = {
      player: playerApp,
      background: background,
      weather: weather,
      todo: todo,
      quotes: quotes,
      settings: settings,
   }*/

  toggleSettingsDataset(eventTarget, field){

    const datasetsArray = toggleDatasetName(eventTarget, 'translate');
    htmlCodeChange.datasetChange('translate', field, datasetsArray[1]);
    htmlCodeChange.datasetChange('action', field, datasetsArray[1]);
    htmlCodeChange.blockInnerToggle(eventTarget, this.lang, datasetsArray[1]);
  }

  settingsClicks(event, options){
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
      case "settings-change-lang-ru":
        console.log("сменить язык на русский");
        this.lang = 'ru';
        console.log(options.background);

        this.translatePage(
            localStorageService.setItemToLocalStorage("lang", "ru"),
            options.background
        );
        Object.keys(options).forEach(app => options[app].lang = this.lang);
        options.weather.refreshWeatherData();
        options.background.insertDateToHTML();

        break;
      case "settings-change-lang-en":
        console.log("сменить язык на английский");
        this.lang = 'en';
        console.log(options.background);

        this.translatePage(
            localStorageService.setItemToLocalStorage("lang", "en"),
            options.background
        );
        Object.keys(options).forEach(app => options[app].lang = this.lang);
        options.weather.refreshWeatherData();
        options.background.insertDateToHTML();

        break;
      case "settings-edit-data-btn": /*todo сделать обработку формы редаксирования*/
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*показать блок для редактировния */
        break;
      case "settings-name":
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*обновить данные и блок */
        break;
      case "settings-city":
        console.log("редактировать данные пользователя и добавить их в локал сторадж");

        /*обновить данные и блок */
        break;
      case "settings-remove-data-btn":
        console.log("удалить все данные пользователя из локал сторадж");
        localStorageService.clearLocalStorage();
        /*обновить страницу*/
        break;
      case "settings-background-api":
        console.log("выбрать источником обоев API");
        options.background._isAPISource = true;
        localStorageService.setItemToLocalStorage('isSourceAPI_bg', true);
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
      case "settings-background-github":
        console.log("выбрать источником обоев github");
        options.background._isAPISource = false;
        localStorageService.setItemToLocalStorage('isSourceAPI_bg', false);
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
      case "settings-quotes-api":
        console.log("выбрать источником цитат API");
        options.quotes.setQuotesSource('API');
        options.quotes.quotesHandler();

        break;
      case "settings-quotes-github":
        console.log("выбрать источником цитат проект");
        options.quotes.setQuotesSource('project');
        options.quotes.quotesHandler();

        break;
      case "hide-player-on": {
        console.log("спрятать плейер");
        hideBlock('.player');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isPlayerVisible', false);

        break;
      }
      case "hide-player-off": {
        console.log("показать плейер");
        showBlock('.player');
        this.toggleSettingsDataset(event.target, field);

        break;
      }
      case "hide-weather-on":
        console.log("спрятать погоду");
        hideBlock('.weather');
        this.toggleSettingsDataset(event.target, field);
                localStorageService.setItemToLocalStorage('isWeatherVisible', false);

        /*oldDatasetName = 'hide-weather-on';
        newDatasetName = 'hide-weather-off';*/
        break;
      case "hide-weather-off":
        console.log("показать блок с погодой");
        showBlock('.weather');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isWeatherVisible', true);
        /*oldDatasetName = 'hide-weather-off';
        newDatasetName = 'hide-weather-on';*/
        break;
      case "hide-clocks-on":
        console.log("спрятать блок с часами");
        hideBlock('.time');
        this.toggleSettingsDataset(event.target, field);
                localStorageService.setItemToLocalStorage('isClocksVisible', false);

        /*oldDatasetName = 'hide-clocks-on';
        newDatasetName = 'hide-clocks-off';*/
        break;
      case "hide-clocks-off":
        console.log("показать блок с часами");
        showBlock('.time');
        this.toggleSettingsDataset(event.target, field);
        /*oldDatasetName = 'hide-clocks-off';
        newDatasetName = 'hide-clocks-on';*/
        break;
      case "hide-date-on":
        console.log("спрятать блок с датой");
        hideBlock('.date');
        this.toggleSettingsDataset(event.target, field);
                localStorageService.setItemToLocalStorage('isDateVisible', false);

        /*oldDatasetName = 'hide-date-on';
        newDatasetName = 'hide-date-off';*/
        break;
      case "hide-date-off":
        console.log("показать блок с датой");
        showBlock('.date');
        this.toggleSettingsDataset(event.target, field);
        /*oldDatasetName = 'hide-date-off';
        newDatasetName = 'hide-date-on';*/
        break;
      case "hide-greetings-on":
        console.log("спрятать блок с приветствием");
                localStorageService.setItemToLocalStorage('isGreetingsVisible', false);

        hideBlock('.greeting-container');
        this.toggleSettingsDataset(event.target, field);
        /*oldDatasetName = 'hide-greetings-on';
        newDatasetName = 'hide-greetings-off';*/
        break;
      case "hide-greetings-off":
        console.log("показать блок с приветствием");
        showBlock('.greeting-container');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isGreetingsVisible', false);
        /*oldDatasetName = 'hide-greetings-off';
        newDatasetName = 'hide-greetings-on';*/
        break;
      case "hide-todo-on":
        console.log("спрятать блок со списком дел");
        hideBlock('.motivation-block');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isToDoVisible', false);

        break;
      case "hide-todo-off":
        console.log("показать блок со списком дел");
        showBlock('.motivation-block');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isToDoVisible', true);

        break;
      case "hide-quotes-on":
        console.log("спрятать блок с цитатами");
        hideBlock('.quote');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isQuotesVisible', false);
        /*oldDatasetName = 'hide-player-on';
        newDatasetName = 'hide-player-off';*/
        break;
      case "hide-quotes-off":
        console.log("показать блок с цитатами");
        showBlock('.quote');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isQuotesVisible', true);

        /*oldDatasetName = 'hide-player-off';
        newDatasetName = 'hide-player-on';*/
        break;
      case "hide-layouts-on":
        console.log("показать подложки под блоки");
        options.background.blockLayoutsAction('on');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isLayoutsVisible', true);


        break;
      case "hide-layouts-off":
        console.log("скрыть подложки под блоками");
        options.background.blockLayoutsAction('off');
        this.toggleSettingsDataset(event.target, field);
        localStorageService.setItemToLocalStorage('isLayoutsVisible', false);


        break;

    }
  }
}
