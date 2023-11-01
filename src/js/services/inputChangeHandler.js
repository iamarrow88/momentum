export default function inputChangeHandler(e, options) {
  /*const options = {
      weather: weatherObj,
      name: backgroundOBj,
      todo: todoObj,
   }*/

  if (
    (e.key === "Enter" &&
        e.target.dataset.action === "city-name-input") ||
    (e.type === "change" && e.target.dataset.action === "city-name-input")
  ) {
    options.weather.weatherHandling(e);
    /*if (
      options.weather.refreshThisCity(
        document.querySelector(".city-name__input"),
      )
    ) {
      options.weather.refreshWeatherData();
    }*/
  } else if (
    (e.key === "Enter" && [...e.target.classList].includes("name__input")) ||
    (e.type === "change" && [...e.target.classList].includes("name__input"))
  ) {
    options.name.nameHandler(e);
  } else if (
    (e.type === "change" && [...e.target.classList].includes("to-do__input"))||
    (e.type === "change" && [...e.target.classList].includes("item__input"))
    ) {
    options.todo.toDoHandler(e);
    /*const task = getInputValue(e.target);
    options.todo.createTaskLine(options.todo.addTaskToArray(task));
    options.todo.cleanInput();*/
  }
}
