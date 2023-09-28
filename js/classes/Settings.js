const Settings = {
  fields: {
    lang: '',
  },
  start(lang){
    this.fields.lang = lang;
    console.log('settings started');
  }
}

export default Settings;