const Clocks = {
  'date': null,
  'lang': null,
  'name': null,
  TIME_ELEMENT: null,
  GREET_ELEMENT: null,
  'changeDate': function (date, locales, dateOptions){
    return date.toLocaleDateString(locales, dateOptions);
  },
  'searchElements': function (){

  },
  /*'getDate': function (lang) {
    let dateFor = new Date();
    this.TIME_ELEMENT.innerHTML = dateFor.toLocaleTimeString();
    if(dateFor.toLocaleTimeString() ==='00:00:00') {
      this.changeDate(dateFor, lang);
    }
    this.greet(dateFor);
    setTimeout(() =>{
      this.getDate(lang);
    }, 1000);
  },*/
  'greet': function(time, lang, appData, greetBlock){
    const hours = time.getHours();
    if(hours > 5 && hours <= 11) {
      if(appData.timeOfADay !== 'morning') {
        appData.timeOfADay = 'morning';
        greetBlock.textContent =  `${appData.greetingTranslation[lang]['morning']}, `;
        /*getImage(appData.timeOfADay, getRandomNUm(20));*/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['morning']}, `;
        }
      }
    } else if (hours > 11 && hours <= 17) {
      if(appData.timeOfADay !== 'afternoon') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['afternoon']}, `;
        appData.timeOfADay = 'afternoon';
        /*getImage( appData.timeOfADay, getRandomNUm(20));*/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['afternoon']}, `;
        }
      }
    } else if (hours > 17 && hours <= 23) {
      if(appData.timeOfADay !== 'evening') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['evening']}, `;
        appData.timeOfADay = 'evening';
        /*getImage( appData.timeOfADay, getRandomNUm(20));*/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['evening']}, `;
        }
      }
    } else {
      if(appData.timeOfADay !== 'night') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['night']}, `;
        appData.timeOfADay = 'night';
        /*getImage( appData.timeOfADay, getRandomNUm(20));*/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['night']}, `;
        }
      }
    }
  }
}

export default Clocks;