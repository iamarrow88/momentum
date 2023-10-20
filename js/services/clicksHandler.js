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
    console.log('player handling');
    options.player.playerClicksHandler(e, options.player);
  } else if([...e.target.classList].includes('city-name-input') ||
      [...e.target.classList].includes('city-name-div')) {
    console.log('weather handling', e.target.value);
    options.weather.weatherHandling(e);
  } else if([...e.target.classList].includes('name__div') ||
      [...e.target.classList].includes('name__input')) {
    console.log('background handling');
  } else if([...e.target.classList].includes('slide-next') ||
      [...e.target.classList].includes('slide-prev')) {
    console.log('slider clicks');
    options.background.changeBackground(e)
  } else if(e.target.closest('.to-do')) {
    options.todo.toDoHandler(e);
  } else if([...e.target.classList].includes('change-btn')) {
    console.log('refresh quotes');
  } else if([...e.target.classList].includes('settings-icon')) {
    console.log('open|close settings');
  } else {
    console.log('another element');
    /*get all inputs values and if there are some changes - refresh required blocks*/
  }
}