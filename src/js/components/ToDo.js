import Base from "./base/Base.js";
import getInputValue from "../services/getInputValue.js";

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
        ["task__item","item"],
        this.HTMLElements.tasksList.element,
          [{ "data-task": `${taskData.id}` }],
      );
      const taskWrapper = this.createElement(
          "div",
          "item__wrapper",
          div,
          null,
      );
      const actionsWrapper = this.createElement(
          "div",
          "item__actions",
          div,
          null,
      );
      const checkbox = this.createElement("input", "to-do__task", taskWrapper, [
        { id: `task${taskData.id}` },
        { type: "checkbox" },
      ]);
      const label = this.createElement("label", "to-do__task-label", taskWrapper, [
        { for: `task${taskData.id}` },
        { "data-task": `${taskData.id}` },
      ]);

      if (taskData.done === "true" || taskData.done === true) {
        checkbox.checked = true;
        label.classList.add("crossed-out");
      } else {
        const editIcon = this.createElement("span", "item__edit", actionsWrapper, [
          { "data-action": "task-edit" },
        ]);
        const deleteIcon = this.createElement("span", "item__delete", actionsWrapper, [
          { "data-action": "task-delete" },
        ]);
        const submitChanges = this.createElement("span", "item__submit", actionsWrapper, [
          { "data-action": "task-submit" },
        ]);
        editIcon.innerHTML = "&#128393;";
        deleteIcon.innerHTML = "&#128465;";
        submitChanges.innerHTML = "&#10003;";
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
      /* сделать сортировку по id?*/
    } else if(e.target.dataset.action === "task-edit") {
      console.log("task-edit");
      const taskID = e.target.closest('.item').dataset.task;
      const taskList = document.querySelector('.to-do__task-list');
      const taskItems = taskList.querySelectorAll('input[type="text"]');
      if(taskItems.length !== 0){
        taskItems.forEach(editInput => {
          const taskValue = editInput.value;
          const taskID = editInput.dataset.task;
          document.querySelector(`div[data-task="${taskID}"]`).classList.remove('editing');
          this.changeDivToInput(taskID, taskValue);
        })
      }

      const submitChangesButton = document.querySelector(`.item[data-task="${taskID}"] .item__submit`);
      submitChangesButton.style.display = "block";

      e.target.closest('.item').classList.add('editing');
      const taskValue = document.querySelector(`label[data-task="${taskID}"]`).innerHTML;
      const itemWrapper = document.querySelector('.editing .item__wrapper');
      itemWrapper.innerHTML = ''
      this.createElement('input', 'item__input',
          itemWrapper, [
            {"type": "text"},
            {"name": "task-value"},
            {"id": "task-value"},
            {"value": `${taskValue}`},
            {"data-task": `${taskID}`},
          ]);

      document.querySelector('.to-do__input').style.pointerEvents = 'none';
      /* TODO добавить возможность редактирования тасков:
 * 1. + определить целевой таск
 * 2. +заменить див на инпут с плейсхолдером === тексту таска
 * 3 + деактивировать основное поле для ввода таска
 *
 */

    } else if(e.target.dataset.action === "task-delete") {
      console.log("task-delete");
      const taskID = e.target.closest('.item').dataset.task;
      console.log(taskID);
      /* TODO добавить возможность удаления тасков:
 * 1. + определить целевой таск
 * 2. найти его в массиве тасков прилжоения
 * 3. удалить его из массива
 * 4. удалить данные о нем из локал сторадж
 * 5. отсортировать полученный массив приложения, присвоить его в массив тасков приложения
 * 6. удалить старые таски из дом
 * 7. отрисовать новый список тасков
 */


    } if(e.target.dataset.action === "task-submit") {
      console.log("task-submit");
      const taskID = e.target.closest('.item').dataset.task;
      const taskValue = document.querySelector('#task-value').value;
      this.changeDivToInput(taskID,taskValue);
      document.querySelector('.to-do__input').style.pointerEvents = 'auto';
      const submitChangesButton = document.querySelector(`.item[data-task="${taskID}"] .item__submit`);
      submitChangesButton.style.display = "none";
      document.querySelector(`div[data-task="${taskID}"]`).classList.remove('editing');

      /*;
      ;
      * */
      /* TODO добавить возможность удаления тасков:
 * 1. + определить целевой таск
 * 3. + по клику value НЕ удаляется
 * 4. после ввода по клику на галочку, любую другую область или по ентер забирается новое вэлью таска
 * 4. создается див с таким вэлью внутри
 * 5. этот такс находится в массиве тасков и его текст заменяется на новый
 * 6. также обнавляется текст таска в локал сторадж
 * 7. активировать основное поле для ввода таска
 */


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

  changeDivToInput(taskID, taskValue){
    const taskWrapper = document.querySelector(`div[data-task="${taskID}"] .item__wrapper`);
    taskWrapper.innerHTML = '';

    this.createElement("input", "to-do__task", taskWrapper, [
      { id: `task${taskID}` },
      { type: "checkbox" },
    ]);
    const label = this.createElement("label", "to-do__task-label", taskWrapper, [
      { for: `task${taskID}` },
      { "data-task": `${taskID}` },
    ]);
    label.innerHTML = `${taskValue}`;
  }
  changeInputToDiv(taskID, taskValue){
    const taskWrapper = document.querySelector(`div[data-task="${taskID}"] .item__wrapper`);
    taskWrapper.innerHTML = '';
    const checkbox = this.createElement("input", "to-do__task", taskWrapper, [
      { id: `task${taskID}` },
      { type: "checkbox" },
    ]);
    const label = this.createElement("label", "to-do__task-label", taskWrapper, [
      { for: `task${taskID}` },
      { "data-task": `${taskID}` },
    ]);
    label.innerHTML = `${taskValue}`;

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
