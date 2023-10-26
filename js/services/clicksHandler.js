import getInputValue from "./getInputValue.js";

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
  }
}