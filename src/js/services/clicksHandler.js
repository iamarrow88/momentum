import getInputValue from "./getInputValue.js";
import localStorageService from "./localStorageService.js";
import stylesActions from "./stylesActions.js";
import htmlCodeChange from "./htmlCodeChange.js";

export default function clicksHandler(e, options) {
  /*const options = {
      player: playerApp,
      background: background,
      weather: weather,
      todo: todo,
      quotes: quotes,
      settings: settings,
   }*/

  if (e.target.closest(".player")) {
    options.player.playerClicksHandler(e, options.player);
  } else if (
      e.target.closest('.city-name-block')
  ) {
    console.log('weather');
    options.weather.weatherHandling(e);
  } else if (
    [...e.target.classList].includes("name__div") ||
    [...e.target.classList].includes("name__input")
  ) {
    options.background.nameHandler(e);
  } else if (
    e.target.dataset.action === 'slide-next' ||
    e.target.dataset.action === 'slide-prev' ||
      e.target.closest('.settings-block') ||
      e.target.dataset.action === 'settings-icon'
  ) {
    console.log("slider or settings clicks");
    options.background.changeBackground(e);
    options.settings.settingsClicks(e, options);
  } else if (e.target.closest(".to-do")) {
    options.todo.toDoHandler(e);
  } else if ([...e.target.classList].includes("change-btn")) {
    options.quotes.quotesHandler(e);
  } else {
    console.log("another element");
    options.background.nameHandler(e);
    options.background.changeBackground(e);
    options.weather.weatherHandling(e);



    const taskInput = document.querySelector(`.item__wrapper input[type="text"]`);
    console.log(taskInput);


    const datasetNamesArray = Object.keys(e.target.dataset);
    console.log(datasetNamesArray);

    if(taskInput) {
      console.log(taskInput.closest('.item'));
      taskInput.closest('.item').classList.remove('editing');
      const taskValue = taskInput.value;
      const taskID = taskInput.dataset.task;
      console.log(taskValue, taskID);
      options.todo.changeDivToInput(taskID, taskValue);
      const submitChangesButton = document.querySelector(`.item[data-task="${taskID}"] .item__submit`);
      submitChangesButton.style.display = "none";

    }
    if (!e.target.dataset.action === "settings-icon") {
      document.querySelector(".footer__settings").classList.remove("visible");
    }
    /*let oldDatasetName = field;
    const action = field.split('-')[field.split('-').length - 1] === 'off' ? 'on' : 'off';
    let newDatasetName = field.split('-').slice(0, field.split('-').length - 1).concat([action]).join('-');*/
    let datasets = [];
    /*if(e.target.dataset.includes('translate')){
      datasets = toggleDataset.apply({datasetName: 'translate'}, [e.target]);
    }*/
    /*console.log(oldDatasetName, action, newDatasetName);*/


    if([...e.target.classList].includes('hide-block__btn')) {
      htmlCodeChange.datasetChange('translate', datasets[0], datasets[1]);
      htmlCodeChange.blockInnerToggle(e.target, options.settings.lang, datasets[1]);
    }
    /*options.settings.toggleDisplayedButtonName(e.target);*/
  }
}
