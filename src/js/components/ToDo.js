import Base from "./base/Base.js";
import getInputValue from "../services/getInputValue.js";

/* TODO добавить возможность удаления тасков:
 * 1. определить целевой таск
 * 2. найти его в массиве тасков прилжоения
 * 3. удалить его из массива
 * 4. удалить данные о нем из локал сторадж
 * 5. отсортировать полученный массив приложения, присвоить его в массив тасков приложения
 * 6. удалить старые таски из дом
 * 7. отрисовать новый список тасков
 */

export default class ToDo extends Base {
  constructor(lang, tasksArray, HTMLElements) {
    super(lang);
    this.tasksArray = tasksArray;
    this.idCounter = null;
    this.HTMLElements = HTMLElements;
  }

  startToDo() {
    this.tasksArray.forEach((task) => this.setTaskToLocalStorage(task));
    this.getTasksFromLocalStorage();
    this.tasksArray = this.sortTasks(this.tasksArray);
    this.idCounter = this.tasksArray.length;
    this.drawTasksList();
  }

  drawTasksList() {
    document.querySelector(".to-do__task-list").innerHTML = "";
    this.tasksArray.forEach((task) => {
      this.drawTaskLine(task);
    });
  }

  createNewTaskData(taskValue) {
    if (taskValue) {
      const taskData = {
        taskValue: taskValue,
        done: false,
        id: this.idCounter,
      };
      this.idCounter += 1;
      return taskData;
    }
    return false;
  }

  addTaskToArray(newTask) {
    if (newTask) {
      this.tasksArray.push(newTask);
      return this.tasksArray;
    } else {
      return false;
    }
  }

  drawTaskLine(taskData) {
    if (taskData) {
      const div = this.createElement(
        "div",
        "task__item",
        this.HTMLElements.tasksList.element,
        null,
      );
      const taskWrapper = this.createElement(
          "div",
          "item__wrapper",
          div,
          null,
      );
      const checkbox = this.createElement("input", "to-do__task", taskWrapper, [
        { id: `task${taskData.id}` },
        { type: "checkbox" },
      ]);
      const label = this.createElement("label", "to-do__task-label", taskWrapper, [
        { id: `task${taskData.id}` },
        { for: `task${taskData.id}` },
        { "data-task": `${taskData.id}` },
      ]);
      const deleteIcon = this.createElement("span", "item__delete", div, [
        { "data-action": "task-delete" },
      ]);
      deleteIcon.innerHTML = "&#128465;";
      if (taskData.done === "true" || taskData.done === true) {
        checkbox.checked = true;
        label.classList.add("crossed-out");
      }
      label.innerHTML = `${taskData.taskValue}`;
      return true;
    } else {
      return false;
    }
  }

  cleanInput() {
    document.querySelector(".to-do__input").value = "";
  }

  isCheckboxChecked(checkbox) {
    return checkbox.checked;
  }

  sortTasks(taskArray) {
    let done = [];
    let undone = [];
    taskArray.forEach((task) => {
      if (task.done === "true" || task.done === true) {
        done.push(task);
      } else {
        undone.push(task);
      }
    });

    return undone.concat(done);
  }

  addDoneStyle(checkboxElement) {
    let done;
    if (this.isCheckboxChecked(checkboxElement)) {
      checkboxElement.nextElementSibling.classList.add("crossed-out");
      done = true;
    } else {
      checkboxElement.nextElementSibling.classList.remove("crossed-out");
      done = false;
    }

    return done;
  }

  setDoneTaskData(taskElement) {
    this.tasksArray.forEach((task) => {
      if (+task.id === +taskElement.nextElementSibling.dataset.task)
        task.done = true;
    });
  }

  toDoHandler(e) {
    /*
     * 1. проверка цели события
     */
    if (
      [...e.target.classList].includes("to-do__input") &&
      e.type === "change"
    ) {
      /* здесь добавляется таск в список
       * 1. сбор данных из инпута +
       * 2. очищение инпута +
       * 3. создание тела таска +
       * 4. отправка данных таска в локал сторадж
       * 6. добавление тела таска в массив тасков приложения
       * 7. сортировка нового массива
       * 8. удаление старых данных из дом
       * 9. отрисовка нового стсортировонного списка тасков
       */
      const taskData = this.createNewTaskData(getInputValue(e.target));
      if (taskData) {
        this.addTaskToArray(taskData);
        this.setTaskToLocalStorage(taskData);
        this.tasksArray = this.sortTasks(this.tasksArray);
        this.drawTasksList();
        this.cleanInput();

      }
    } else if ([...e.target.classList].includes("to-do__btn")) {
      const taskElements = document.querySelectorAll(".task__item");

      taskElements.forEach((task) => {
        if (task.firstChild.checked) {
          task.classList.toggle("invisible");
        }
      });
    } else if ([...e.target.classList].includes("to-do__task")) {
      /* Здесь целевой таск отмечается сделанным или несделанным
       * 1. определяем id выбранного таска
       * 2. находим его в массиве тасков приложения
       * 3. отмечаем в данных таска, что он сделан/несделан
       * 4. добавляем соответствующий стиль
       * 5. обновляем данные в локал сторадж
       */
      this.addDoneStyle(e.target);
      this.setDoneTaskData(e.target);
      this.tasksArray = this.sortTasks(this.tasksArray);
      this.drawTasksList();
      /*+ сделать сортировку по id?*/
    }
  }

  setTaskToLocalStorage(task) {
    const template = `task-${task.id}`;

    Object.keys(task).forEach((taskField) => {
      if (
        !localStorage.getItem(`${template}-${taskField}`) &&
        taskField !== "id"
      ) {
        localStorage.setItem(`${template}-${taskField}`, `${task[taskField]}`);
      }
    });
  }

  deleteTaskFromLocalStorage() {
    console.log("delete");
  }

  getTasksFromLocalStorage() {
    let objectsStorage = {};
    Object.keys(localStorage).forEach((key) => {
      const splittedKey = key.split("-");

      if (splittedKey.includes("task")) {
        const id = +splittedKey[1];
        const field = splittedKey[2];
        if (!objectsStorage[id]) {
          objectsStorage[id] = {
            id: id,
            taskValue: "",
            done: false,
          };
        }

        if (field === "taskValue") {
          objectsStorage[id].taskValue = localStorage.getItem(`${key}`);
        } else if (field === "done") {
          objectsStorage[id].done = localStorage.getItem(`${key}`);
        }
      }
    });

    this.tasksArray = [];
    Object.keys(objectsStorage).forEach((task) => {
      this.tasksArray.push(objectsStorage[task]);
    });
    return this.tasksArray;
  }
}
