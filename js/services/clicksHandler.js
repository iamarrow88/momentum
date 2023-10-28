import getInputValue from "./getInputValue.js";
import localStorageService from "./localStorageService.js";

export default function clicksHandler(e, options) {

  /*const options = {
      player: playerApp,
      background: background,
      weather: weather,
      todo: todo,
      quotes: quotes,
      settings: settings,
   }*/
  if(e.target.closest('.player')){
    options.player.playerClicksHandler(e, options.player);
  } else if([...e.target.classList].includes('city-name-input') ||
      [...e.target.classList].includes('city-name-div')) {
    options.weather.weatherHandling(e);
  } else if([...e.target.classList].includes('name__div') ||
      [...e.target.classList].includes('name__input')) {
    options.background.nameHandler(e);
  } else if([...e.target.classList].includes('slide-next') ||
      [...e.target.classList].includes('slide-prev') ||
      [...e.target.classList].includes('settings-icon')) {
    console.log('slider or settings clicks');
    options.background.changeBackground(e);
  } else if(e.target.closest('.to-do')) {
    options.todo.toDoHandler(e);
  } else if([...e.target.classList].includes('change-btn')) {
    options.quotes.quotesHandler(e);
  } else {
    console.log('another element');
    if(![...e.target.classList].includes('settings-icon')) {
      document.querySelector('.footer__settings').classList.remove('visible');
    }
    const field = e.target.dataset.translate;
    switch (field) {
      case 'settings-change-lang-ru':
        console.log('сменить язык на русский');

        options.settings.translatePage(
            localStorageService.setItemToLocalStorage('lang', 'ru')
        );
        break;
      case 'settings-change-lang-en':
        console.log('сменить язык на английский');

        options.settings.translatePage(
            localStorageService.setItemToLocalStorage('lang', 'en')
        );
        break;
      case 'settings-remove-data-btn':
        console.log('удалить все данные пользователя из локал сторадж');
        localStorageService.clearLocalStorage();
        /*обновить страницу*/
        break;
      case 'settings-hide-player-on':
        console.log('спрятать плейер');
        break;
      case 'settings-hide-player-off':
        console.log('показать плейер');
        break;
      case 'settings-hide-weather-on':
        console.log('спрятать погоду');
        break;
      case 'settings-hide-weather-off':
        console.log('показать блок с погодой');
        break;
      case 'settings-hide-clocks-on':
        console.log('спрятать блок с часами');
        break;
      case 'settings-hide-clocks-off':
        console.log('показать блок с часами');
        break;
      case 'settings-hide-date-on':
        console.log('спрятать блок с датой');
        break;
      case 'settings-hide-date-off':
        console.log('показать блок с датой');
        break;
      case 'settings-hide-greetings-on':
        console.log('спрятать блок с приветствием');
        break;
      case 'settings-hide-greetings-off':
        console.log('показать блок с приветствием');
        break;
      case 'settings-hide-todo-on':
        console.log('спрятать блок со списком дел');
        break;
      case 'settings-hide-todo-off':
        console.log('показать блок со списком дел');
        break;
      case 'settings-hide-quotes-on':
        console.log('спрятать блок с цитатами');
        break;
      case 'settings-hide-quotes-off':
        console.log('показать блок с цитатами');
        break;
      case 'settings-hide-background-api':
        console.log('выбрать источником обоев API');
        break;
      case 'settings-hide-background-github':
        console.log('выбрать источником обоев github');
        break;

    }
  }
}