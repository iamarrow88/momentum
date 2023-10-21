import getInputValue from "./getInputValue.js";
export default function inputChangeHandler(e, options) {

  /*const options = {
      weather: weatherObj,
      name: backgroundOBj,
      todo: todoObj,
   }*/
  if(e.key === 'Enter' && [...e.target.classList].includes('city-name-input') ||
      e.type === 'change' && [...e.target.classList].includes('city-name-input')) {
    if(options.weather.refreshThisCity(document.querySelector('.city-name-input'))) {
      console.log('weather input');
      options.weather.refreshWeatherData();
    }
  } else if(e.key === 'Enter' && [...e.target.classList].includes('name__input') ||
      e.type === 'change' && [...e.target.classList].includes('name__input')) {
    options.name.nameHandler(e);
  } else if(e.key === 'Enter' && [...e.target.classList].includes('to-do__input') ||
      e.type === 'change' && [...e.target.classList].includes('to-do__input')){
    console.log('to do keyboard');
    options.todo.toDoHandler(e);
    /*const task = getInputValue(e.target);
    options.todo.createTaskLine(options.todo.addTaskToArray(task));
    options.todo.cleanInput();*/
  }
};
