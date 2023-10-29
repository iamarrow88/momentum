import getInputValue from "./getInputValue.js";
import localStorageService from "./localStorageService.js";
import stylesActions from "./stylesActions.js";

export default function clicksHandler(e, options) {
  /*const options = {
      player: playerApp,
      background: background,
      weather: weather,
      todo: todo,
      quotes: quotes,
      settings: settings,
   }*/

  const showBlock = stylesActions.changeStyle.bind({
    "classToRemove": "invisible-block",
    "newClass": "visible-block"
  });

  const hideBlock = stylesActions.changeStyle.bind({
    "classToRemove": "visible-block",
    "newClass": "invisible-block"
  });

  if (e.target.closest(".player")) {
    options.player.playerClicksHandler(e, options.player);
  } else if (
    [...e.target.classList].includes("city-name-input") ||
    [...e.target.classList].includes("city-name-div")
  ) {
    options.weather.weatherHandling(e);
  } else if (
    [...e.target.classList].includes("name__div") ||
    [...e.target.classList].includes("name__input")
  ) {
    options.background.nameHandler(e);
  } else if (
    [...e.target.classList].includes("slide-next") ||
    [...e.target.classList].includes("slide-prev") ||
    [...e.target.classList].includes("settings-icon")
  ) {
    console.log("slider or settings clicks");
    options.background.changeBackground(e);
  } else if (e.target.closest(".to-do")) {
    options.todo.toDoHandler(e);
  } else if ([...e.target.classList].includes("change-btn")) {
    options.quotes.quotesHandler(e);
  } else /*if ([...e.target.classList].includes("item__actions")) {
    options.quotes.quotesHandler(e);
  } else */{
    console.log("another element");
    const taskInput = document.querySelector(`.item__wrapper input[type="text"]`);
    console.log(taskInput);

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
    if (![...e.target.classList].includes("settings-icon")) {
      document.querySelector(".footer__settings").classList.remove("visible");
    }
    const field = e.target.dataset.translate;
    switch (field) {
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
      case "settings-remove-data-btn":
        console.log("удалить все данные пользователя из локал сторадж");
        localStorageService.clearLocalStorage();
        /*обновить страницу*/
        break;
      case "settings-hide-player-on":
        console.log("спрятать плейер");
        hideBlock('.player');
        break;
      case "settings-hide-player-off":
        console.log("показать плейер");
        showBlock('.player');
        break;
      case "settings-hide-weather-on":
        console.log("спрятать погоду");
        hideBlock('.weather');
        break;
      case "settings-hide-weather-off":
        console.log("показать блок с погодой");
        showBlock('.weather');
        break;
      case "settings-hide-clocks-on":
        console.log("спрятать блок с часами");
        hideBlock('.time');
        break;
      case "settings-hide-clocks-off":
        console.log("показать блок с часами");
        showBlock('.time');
        break;
      case "settings-hide-date-on":
        console.log("спрятать блок с датой");
        hideBlock('.date');
        break;
      case "settings-hide-date-off":
        console.log("показать блок с датой");
        showBlock('.date');
        break;
      case "settings-hide-greetings-on":
        console.log("спрятать блок с приветствием");
        hideBlock('.greeting-container');
        break;
      case "settings-hide-greetings-off":
        console.log("показать блок с приветствием");
        showBlock('.greeting-container');
        break;
      case "settings-hide-todo-on":
        console.log("спрятать блок со списком дел");
        hideBlock('.motivation-block');
        break;
      case "settings-hide-todo-off":
        console.log("показать блок со списком дел");
        showBlock('.motivation-block');
        break;
      case "settings-hide-quotes-on":
        console.log("спрятать блок с цитатами");
        hideBlock('.quote');
        break;
      case "settings-hide-quotes-off":
        console.log("показать блок с цитатами");
        showBlock('.quote');
        break;
      case "settings-hide-background-api":
        console.log("выбрать источником обоев API");
        localStorage.setItem("isSourceAPI", true);
        options.background._isAPISource = true;
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
      case "settings-hide-background-github":
        console.log("выбрать источником обоев github");
        localStorage.setItem("isSourceAPI", false);
        options.background._isAPISource = false;
        options.background.loadImages(options.background._numberOfPictures);
        options.background.setBackgroundImage();
        break;
    }
  }
}
