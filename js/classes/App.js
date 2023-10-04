import Player from './Player.js';
import ClocksBackground from "./ClocksBackground.js";
import Quotes from "./Quotes.js";
import Base from "./base/Base.js";


/* !TODO
*    смена иконки в плеере при проигрывании,остановке музыки
*    смена языка в приложении (рус, англ, бел)
*    регулировка звука в плеере
*    доделать тудушку
*    передалать настройки (спрятать показать меню, плеер и тп
*    сделать ловушку для цитат, если не подгружается новая (типа упс, не получили цитату, вот вам нашенская рандомная
*    переписать все на классах
*    подгрузка обоев из UnsplashApi */

class App extends Base{
  constructor(lang, name, city, store, HTMLElements) {
    super(lang, name, HTMLElements, city);
    this.date = new Date();
    this.appStore = store;
    this.player = new Player(lang, name, city, store.HTMLElements, store.player);
    this.quotes = new Quotes(lang, store.quotes);
    this.player.startPlayer();
    this.quotes.startQuotes();
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
    this.background = new ClocksBackground(this.lang, this.name, this.appStore.clocks, this.appStore.translation, this.appStore.HTMLElements);
    this.background.startClocksBackground();
    console.log('start App');
    this.HTMLElements.background.element.addEventListener('click', (e) => {
      this.background.changeBackground(e, this.background);
    });

  }
}

export default App;
