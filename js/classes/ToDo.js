const ToDo = {
  fields: {
    lang: '',
    tasksArray: [],
  },
  start(lang, tasksArray) {
    this.fields.lang = lang;
    this.fields.tasksArray = tasksArray;
    console.log('ToDo started');
  }
}

export default ToDo;