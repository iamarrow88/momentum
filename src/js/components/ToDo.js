import Base from "./base/Base.js";
import getInputValue from "../services/getInputValue.js";
import localStorageService from "../services/localStorageService.js";

export default class ToDo extends Base {
  constructor(lang, tasksArray, HTMLElements) {
    super(lang);
    this.initTasks = tasksArray;
    this.tasksArray = [];
    this.idCounter = new Date().getTime();
    this.HTMLElements = HTMLElements;
    this._isDoneTasksHide = false;
    this._isFakeTasksDestroyed = false;
    this._filterType = 'desc'; /*'desc || 'asc'*/
  }

  startToDo() {
    this.checkIsDoneTasksHide();
    if(!this.areAnyTasksInLocalStorage()) {
      this.tasksArray = this.initTasks;
    } else {
      this.getTasksFromLocalStorage();
    }
    this.tasksArray = this.sortTasksByDone(this.tasksArray);
    /*this.tasksArray = this.sortTasksByID(this.tasksArray);*/
    this.drawTasksList();
    if(this._isDoneTasksHide){
      this.hideDoneTasks();
    }
  }

  drawTasksList() {
    console.log('draw');
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
        if(this._isDoneTasksHide) taskWrapper.classList.add('invisible');
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

  sortTasksByDone(taskArray) {
    let done = [];
    let undone = [];
    taskArray.forEach((task) => {
      if (task.done === "true" || task.done === true) {
        done.push(task);
      } else {
        undone.push(task);
      }
    });
    const a = this.sortTasksByID(undone, this._filterType);
    const b = this.sortTasksByID(done, this._filterType);

    return a.concat(b);
  }

  sortTasksByID(taskArray, type='desc'){
    const tasksIDs = taskArray.map(task => task.id);
    const func = type === 'desc' ? function(a, b){return a - b} : function(a, b){return b - a};
    tasksIDs.sort(func);
    console.log(tasksIDs);
    let sortTasksArray = [];
    tasksIDs.forEach(id => {
      for (let i = 0; i < Object.keys(this.tasksArray).length; i++){
        if(+this.tasksArray[i].id === +id) {
          sortTasksArray.push(this.tasksArray[i]);
          break;
        }

      }
    })
    console.log(sortTasksArray);
    return sortTasksArray;
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
        task.done = taskElement.checked;
    });
  }

  hideDoneTasks(){
    const taskElements = document.querySelectorAll(".item__wrapper");
    taskElements.forEach((task) => {
      if (task.firstChild.checked) {
        task.classList.toggle("invisible");
      }
    });
  }

  destroyFakeTasks(){
    const fakeTasksIDs = [0, 1, 2];
    let newTasksArray = [];
    this.tasksArray.forEach(task => {
      if(!fakeTasksIDs.includes(task.id)){
        newTasksArray.push(task)
      }
    })
    return newTasksArray;
  }

  toDoHandler(e) {

    console.log(e.type);
    console.log(e.target);
    if (
      [...e.target.classList].includes("to-do__input") &&
      e.type === "change"
    ) {
      const taskData = this.createNewTaskData(getInputValue(e.target));
      if (taskData) {
        this.addTaskToArray(taskData);
        if(!this._isFakeTasksDestroyed) {
          this.tasksArray = this.destroyFakeTasks();
          this.drawTasksList();
        }
        localStorageService.setObjectFieldsToLocalStorage(taskData, 'task');
        this.tasksArray = this.sortTasksByID(this.tasksArray);
        this.tasksArray = this.sortTasksByDone(this.tasksArray);
        this.drawTasksList();
        this.cleanInput();

      }
    } else if ([...e.target.classList].includes("to-do__btn")) {
      this._isDoneTasksHide = !this._isDoneTasksHide;
      localStorageService.setItemToLocalStorage('isDoneTasksHide', `${this._isDoneTasksHide}`);
      this.hideDoneTasks();
      /*this.unHideTasks();*/
    } else if ([...e.target.classList].includes("to-do__task")) {
      this.addDoneStyle(e.target);
      if(this._isDoneTasksHide){
        this.hideDoneTasks();
      }
      this.setDoneTaskData(e.target);
      localStorageService.setItemToLocalStorage(`task-${e.target.closest('.item').dataset.task}-done`, e.target.checked);

      this.tasksArray = this.sortTasksByDone(this.tasksArray);
      this.drawTasksList();
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

    } else if(e.target.dataset.action === "task-delete") {
      console.log("task-delete");
      const taskID = +e.target.closest('.item').dataset.task;

      let taskToDeleteIndex;
      this.tasksArray.forEach((taskData, index) => {
        if(+taskData.id === taskID){
          taskToDeleteIndex = index;
        }
      })
      localStorageService.deleteObjectFieldsFromLocalStorage(this.tasksArray[taskToDeleteIndex], 'task');
      this.tasksArray = this.tasksArray.slice(0, taskToDeleteIndex).concat(this.tasksArray.slice(taskToDeleteIndex + 1));
      this.tasksArray = this.sortTasksByID(this.tasksArray);
      this.tasksArray = this.sortTasksByDone(this.tasksArray);
      this.drawTasksList();
     } if(e.target.dataset.action === "task-submit" ||
    e.type === 'change' && [...e.target.classList].includes('item__input')) {
      console.log("task-submit");
      const taskID = e.target.closest('.item').dataset.task;
      const taskValue = document.querySelector('#task-value').value;
      localStorageService.setItemToLocalStorage(`task-${taskID}-taskValue`, taskValue);
      this.changeDivToInput(taskID,taskValue);
      document.querySelector('.to-do__input').style.pointerEvents = 'auto';
      const submitChangesButton = document.querySelector(`.item[data-task="${taskID}"] .item__submit`);
      submitChangesButton.style.display = "none";
      document.querySelector(`div[data-task="${taskID}"]`).classList.remove('editing');
    } else if(e.target.dataset.action === 'filter'){
      this._filterType = this._filterType === 'desc' ? 'asc' : 'desc';
      this.tasksArray = this.sortTasksByDone(this.tasksArray);
      this.drawTasksList();
    }

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

  areAnyTasksInLocalStorage(){
    let res = false;
    Object.keys(localStorage).forEach(key => {
      if(key.split('-').includes('task')) res = true;
    })
    return res;
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

  checkIsDoneTasksHide() {
    const value = localStorageService.getItemFromLocalStorage('isDoneTasksHide');
    this._isDoneTasksHide = !(value === 'false' || !value);
  }

  unHideTasks() {

  }
}
