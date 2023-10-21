import Base from "./base/Base.js";
import getInputValue from "../services/getInputValue.js";

export default class ToDo extends Base {
  constructor(lang, tasksArray, HTMLElements) {
    super(lang);
    this.tasksArray = tasksArray;
    this.idCounter = this.tasksArray.length;
    this.HTMLElements = HTMLElements;
    this.tasksArray.forEach(task => this.setTaskToLocalStorage(task));
    this.getTasksFromLocalStorage();
    console.log(this.tasksArray);
  }

  startToDo() {
    this.drawTasksList();
  }

  drawTasksList(){
    document.querySelector('.to-do__task-list').innerHTML = '';
    this.tasksArray.forEach(task => {
      this.createTaskLine(task);
    })
  }

  createNewTaskData(taskValue){
    if(taskValue) {
      const taskData = {
        taskValue: taskValue,
        done: false,
        id: this.idCounter
      }
      this.idCounter += 1;
      return taskData;
    }
    return false
  }

  addTaskToArray(newTask){
      if(newTask){
        this.tasksArray.push(newTask)
        console.log('task added to array');
        return this.tasksArray;
      } else {
        return false;
      }
  }

  createTaskLine(taskData){
    if(taskData){
      const div = this.createElement('div', 'task__item', this.HTMLElements.tasksList.element, null);
      const checkbox = this.createElement('input', 'to-do__task', div,
          [{'id': `task${taskData.id}`}, {'type': 'checkbox'}]);
      const label = this.createElement('label', 'to-do__task-label', div,
          [{'id': `task${taskData.id}`}, {'for': `task${taskData.id}`}, {'data-task': `${taskData.id}`}]);
      if(taskData.done){
        checkbox.checked = true;
        label.classList.add('crossed-out');
      }
      label.innerHTML = `${taskData.taskValue}`;
      return true;
    } else {
      return false;
    }
  }

  cleanInput(){
    document.querySelector('.to-do__input').value = '';
  }

  isCheckboxChecked(checkbox){
    return checkbox.checked;
  }

  sortTasks(taskArray){
    let done = [];
    let undone = [];
    taskArray.forEach(task => {
      if(task.done) {
        done.push(task);
      } else {
        undone.push(task);
      }
    })

    return  undone.concat(done);
  }

  addDoneStyle(checkboxElement){
    let done;
    if(this.isCheckboxChecked(checkboxElement)){
      checkboxElement.nextElementSibling.classList.add('crossed-out');
      done = true;
    } else {
      checkboxElement.nextElementSibling.classList.remove('crossed-out');
      done = false;
    }

    return done;
  }

  setDoneTaskData(taskElement){
    this.tasksArray.forEach(task => {
      if(+task.id === +taskElement.nextElementSibling.dataset.task) task.done = true;
    })
  }

  toDoHandler(e) {
    if([...e.target.classList].includes('to-do__input') && e.type === 'change') {
      console.log('change');
      const taskData = this.createNewTaskData(getInputValue(e.target));
      if(taskData) this.addTaskToArray(taskData);
      if(this.createTaskLine(taskData)) this.cleanInput();
      this.setTaskToLocalStorage(taskData);
      console.log('add task');
    } else if([...e.target.classList].includes('to-do__btn')) {
      console.log('hide completed tasks');
      const taskElements = document.querySelectorAll('.task__item');

      taskElements.forEach(task => {
        if(task.firstChild.checked) {
          task.classList.toggle('invisible');
        }
      })
    } else if([...e.target.classList].includes('to-do__task')) {
      console.log('check|uncheck task');
      this.addDoneStyle(e.target);
      this.setDoneTaskData(e.target);
      this.tasksArray = this.sortTasks(this.tasksArray);
      this.drawTasksList();
      /*+ сделать сортировку по id?*/
    }
  }

  setTaskToLocalStorage(task){
    const template = `task-${task.id}`;
    Object.keys(task).forEach(taskField => {
      localStorage.setItem(`${template}-${taskField}`, `${task[taskField]}`);
    })
  }

  deleteTaskFromLocalStorage(){
    console.log('delete');
  }

  getTasksFromLocalStorage(){
    console.log(localStorage);
    Object.keys(localStorage).forEach(key => {
      const splittedKey = key.split('-');
      console.log(splittedKey);
      let obj = {};
      if(splittedKey.includes('task')){
        const id = splittedKey[1];
        const field = splittedKey[2];
        if(field === 'taskValue') {
          obj = {
            taskValue: localStorage.getItem(`${key}`),
            id: `${id}`,
          }
        } else if(field === 'done'){
          obj = {
            done: localStorage.getItem(`${key}`),
          }
        }
        if(Object.keys(obj).length === 3) this.tasksArray.push(obj);
      }
    })
  }
}
