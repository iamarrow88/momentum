import Player from "./Player.js";
import ClocksBackground from "./ClocksBackground.js";
import Quotes from "./Quotes.js";
import Base from "./base/Base.js";
import Weather from "./Weather.js";
import ToDo from "./ToDo.js";

import inputChangeHandler from "../services/inputChangeHandler.js";
import clicksHandler from "../services/clicksHandler.js";
import Settings from "./Settings.js";
import localStorageService from "../services/localStorageService.js";

class App extends Base {
  constructor(lang, name, city, store, HTMLElements) {
    super(lang, name, HTMLElements, city);
    this.date = new Date();
    this.appStore = store;
    this.player = {};
    this.background = {};
    this.langs = Object.keys(store.translation);
    this.quotes = {};
    this.weather = {};
    this.toDo = {};
    this.settings = {};
  }

  set setLang(newLang) {
    if (Object.keys(this.appStore.translation).includes(newLang)) {
      this.lang = newLang;
    } else {
      console.log(
        "Ошибка - введенный язык не найден. Выбран английский язык.\n" +
          "Attention! The selected language is not found. English was set.",
      );
      this.lang = "en";
    }
    localStorageService.setItemToLocalStorage("lang", this.lang);
  }

  set setName(newName) {
    this.name = newName;
  }

  set setCity(newCity) {
    this.city = newCity;
  }

  setProperty(newPropName, newPropValue) {
    this[newPropName] = newPropValue;
  }

  startApp() {
    this.player = new Player(
        this.lang,
        this.name,
        this.city,
        this.HTMLElements,
        this.appStore.player,
    );
    this.background = new ClocksBackground(
        this.lang,
        this.name,
        this.appStore.clocks,
        this.appStore.translation,
        this.HTMLElements,
    );
    this.quotes = new Quotes(this.lang, this.appStore.quotes, this.HTMLElements);
    this.weather = new Weather(this.lang, this.city, this.HTMLElements, this.appStore.weather);
    this.toDo = new ToDo(this.lang, this.appStore.toDo.tasksArray, this.HTMLElements);
    this.settings = new Settings(this.lang, this.langs, this.appStore.translation);
    this.searchHTMLElements.apply(this.appStore);
    this.player.startPlayer();
    this.background.startClocksBackground();
    this.weather.startWeather();
    this.weather.checkLastUpdate(5, 1);
    this.quotes.startQuotes();
    this.toDo.startToDo();
    this.settings.startSettings();

    document.querySelectorAll('div.slider-icon').forEach(button => button.style.height = `${window.innerHeight}`);
    const clickOptions = {
      player: this.player,
      background: this.background,
      weather: this.weather,
      todo: this.toDo,
      quotes: this.quotes,
      settings: this.settings,
      app: this,
    };
    this.HTMLElements.background.element.addEventListener("click", (e) => {
      clicksHandler(e, clickOptions);
    });

    this.HTMLElements.background.element.addEventListener("input", (e) => {
      this.player.changeHandler(e);
    });

    const options = {
      weather: this.weather,
      name: this.background,
      todo: this.toDo,
    };

    this.HTMLElements.background.element.addEventListener("change", (e) => {
      inputChangeHandler(e, options);
    });

    document.addEventListener('refresh',  () => this.startApp(), {once: true})
  }
}

export default App;
