const Settings1 = {
  fields: {
    lang: "",
  },
  start(lang) {
    this.fields.lang = lang;
    console.log("settings started");
  },
};

export default Settings1;
