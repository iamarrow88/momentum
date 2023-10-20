import Base from "./base/Base.js";
import getInputValue from "../services/getInputValue.js";

export default class ToDo extends Base {
  constructor(lang, tasksArray, HTMLElements) {
    super(lang);
    this.tasksArray = tasksArray;
    this.idCounter = this.tasksArray.length;
    this.HTMLElements = HTMLElements;
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

  addTaskToArray(newTask){
    if(newTask){
      const taskData = {
        taskValue: newTask,
        done: false,
        id: this.idCounter
      }
      this.idCounter += 1;
      this.tasksArray.push(taskData)
      console.log('task added to array');

      return taskData;
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
    if([...e.target.classList].includes('to-do__input')) {
      const taskArray = this.addTaskToArray(getInputValue(e.target));
      if(this.createTaskLine(taskArray)) this.cleanInput();
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
}
