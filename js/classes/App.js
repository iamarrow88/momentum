class App {
  constructor(lang, customerName, city, picturePathMap, quotesMap, clocks, appData){
    this.lang = lang;
    this.customerName = customerName;
    this.city = city;
    this.picturePathMap = picturePathMap;
    this.quotesMap = quotesMap;
    this.date = new Date();
    this.clocks = clocks;
    this.clocks.lang = lang;
    this.appData = appData;
  }

  set setLang(newLang){
    if(Object.keys(this.appData.translation).includes(newLang)) {
      this.lang = this.clocks.lang = newLang;
      localStorage.setItem('lang', newLang);
    } else {
      console.log('Ошибка - введенный язык не найден. Выбран английский язык.\n' +
      'Attention! The selected language is not found. English was set.')
      this.lang = this.clocks.lang = 'en';
      localStorage.setItem('lang', 'en');
    }
  }

  set setProperty([newPropName, newPropValue]){
    this[newPropName] = newPropValue;
  }

  startApp(){
    this.appData.blocks.forEach(block => {

    })
    //this.setClockProperties({date: this.date, lang: this.lang, name: this.customerName}, this.clocks);
  }

}

export default App;