import Player from "./Player.js";
import ClocksBackground from "./ClocksBackground.js";
import Quotes from "./Quotes.js";
import Base from "./base/Base.js";
import Weather from "./Weather.js";
import ToDo from "./ToDo.js";

import inputChangeHandler from '../services/inputChangeHandler.js'
import clicksHandler from "../services/clicksHandler.js";
import Settings from "./Settings.js";
import changeHandler from "../services/changeHandler.js";

/* !TODO
*    смена иконки в плеере при проигрывании,остановке музыки
*    смена языка в приложении (рус, англ, бел)
*    регулировка звука в плеере
*    доделать тудушку
*    передалать настройки (спрятать показать меню, плеер и тп
*    сделать ловушку для цитат, если не подгружается новая (типа упс, не получили цитату, вот вам нашенская рандомная
*    переписать все на классах
*    подгрузка обоев из UnsplashApi
*    сделать подложку под блоки (вкл/выкл)
*    сделать сортировку тасков по id?
* */


class App extends Base {
  constructor(lang, name, city, store, HTMLElements) {
    super(lang, name, HTMLElements, city);
    this.date = new Date();
    this.appStore = store;
    this.player = new Player(lang, name, city, store.HTMLElements, store.player);
    this.background = new ClocksBackground(lang, name, store.clocks, store.translation, store.HTMLElements);
    this.quotes = new Quotes(lang, store.quotes);
    this.weather = new Weather(lang, city, HTMLElements, this.appStore.weather);
    this.toDo = new ToDo(lang, store.toDo.tasksArray, HTMLElements);
    this.settings = new Settings(lang);
  }

  set setLang(newLang) {
    if (Object.keys(this.appStore.translation).includes(newLang)) {
      this.lang = newLang;
      localStorage.setItem("lang", newLang);
    } else {
      console.log("Ошибка - введенный язык не найден. Выбран английский язык.\n"
      + "Attention! The selected language is not found. English was set.");
      this.lang = "en";
      localStorage.setItem("lang", "en");
    }
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
    this.searchHTMLElements.apply(this.appStore);
    this.player.startPlayer();
    this.background.startClocksBackground();
    this.weather.startWeather();
    this.weather.checkLastUpdate(5, 1);
    this.quotes.startQuotes();
    this.toDo.startToDo();
    const clickOptions = {
      player: this.player,
      background: this.background,
      weather: this.weather,
      todo: this.toDo,
      quotes: this.quotes,
      settings: this.settings,
    }
    this.HTMLElements.background.element.addEventListener("click", (e) => {
      clicksHandler(e, clickOptions);
    });

    this.HTMLElements.background.element.addEventListener("input", (e) => {
      changeHandler(e, { player: this.player })
    })

    const options = {
      weather: this.weather,
      name: this.background,
      todo: this.toDo,
    }

    this.HTMLElements.background.element.addEventListener('change', (e) => {
      inputChangeHandler(e, options);
    });
    /*this.HTMLElements.background.element.addEventListener('keypress', (e) => {
      inputChangeHandler.inputChangeHandler(e, options);
    });*/
    /*this.HTMLElements.background.element.addEventListener('change', (e) => {
      this.weather.inputChangeHandler(e, this.weather);
    });
    this.HTMLElements.background.element.addEventListener('keypress', (e) => {
      this.weather.inputChangeHandler(e, this.weather);
    });*/
  }
}

export default App;
