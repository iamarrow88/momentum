import basic from "../actions/commonFunctions.js";
import appData from "../data/appData.js";

const ClocksBackground = {
  fields: {
    lang: null,
    name: null,
    timeOfTheDay: null,
    currentPictureNumber: '01',
    dayMap: {
      morning: {
        start: 5,
        end: 11
      },
      afternoon: {
        start: 12,
        end: 17
      },
      evening: {
        start: 18,
        end: 19
      },
      night1: {
        start: 23,
        end: 23
      },
      night2: {
        start: 0,
        end: 4
      },
    },
    HTMLElements: {
      time: '.time',
      date: '.date',
      greeting: '.greeting',
      name: '.name',
      prev: '.slide-prev',
      next: '.slide-next'
    }
  },
  start(lang, name){
    this.fields.lang = lang;
    this.fields.name = name;
    basic.searchHTMLElements.call(this);
    console.log(this.fields.HTMLElements);
    this.getDate(this.fields.lang);
  },
  changeDate(date, locales, dateOptions){
    return date.toLocaleDateString(locales, dateOptions);
  },
  setDate() {
    return new Date();
  },
  createGreetsBlock(){

  },
  checkTimeOfTheDay(hours){
    console.log('check');

    for(let time in this.fields.dayMap){
      console.log(time);
      if(hours >= this.fields.dayMap[time].start && hours <= this.fields.dayMap[time].end){
        console.log(hours >= this.fields.dayMap[time].start);
        console.log(hours <= this.fields.dayMap[time].end);
        if(time === 'night1' || time === 'night2'){
          return 'night';
        } else {
          return time;
        }
      }
      console.log('end');
    }
  },
  getDate(lang) {
    let currentDate = new Date();
    this.fields.HTMLElements.time.innerHTML = currentDate.toLocaleTimeString();
    if (currentDate.toLocaleTimeString() === '00:00:00') {
      changeDate(currentDate, lang);
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.checkTimeOfTheDay(hours);
    console.log(this.fields.timeOfTheDay);
    console.log(newTimeOfTheDay);
    if(this.fields.timeOfTheDay !== newTimeOfTheDay){
      this.fields.timeOfTheDay = newTimeOfTheDay;
      this.greet(currentDate, this.fields.lang, appData, this.fields.HTMLElements.greeting);
    }
    setTimeout(() => {
      this.getDate(ClocksBackground.fields.lang);
    }, 1000);
  },
  greet: function(timeOfTheDay, lang, appData, greetBlock){
    console.log('here');
    switch (this.fields.timeOfTheDay) {
      case 'morning':
        greetBlock.textContent =  `${appData.translation[lang]['morning']}, `;
        console.log(' greet morning');
        break;
      case 'afternoon':
        greetBlock.textContent =  `${appData.translation[lang]['afternoon']}, `;
        console.log(' greet afternoon');
        break;
      case 'evening':
        greetBlock.textContent =  `${appData.translation[lang]['evening']}, `;
        console.log(' greet evening');
        break;
      case 'night':
        console.log(appData.translation[lang]);
        greetBlock.textContent =  `${appData.translation[lang]['night']}, `;
        console.log(` greet night`);
        break;
    }
    /*const hours = time.getHours();
    if(hours > 5 && hours <= 11) {
      if(appData.timeOfADay !== 'morning') {
        appData.timeOfADay = 'morning';

        /!*getImage(appData.timeOfADay, getRandomNUm(20));*!/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['morning']}, `;
        }
      }
    } else if (hours > 11 && hours <= 17) {
      if(appData.timeOfADay !== 'afternoon') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['afternoon']}, `;
        appData.timeOfADay = 'afternoon';
        /!*getImage( appData.timeOfADay, getRandomNUm(20));*!/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['afternoon']}, `;
        }
      }
    } else if (hours > 17 && hours <= 23) {
      if(appData.timeOfADay !== 'evening') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['evening']}, `;
        appData.timeOfADay = 'evening';
        /!*getImage( appData.timeOfADay, getRandomNUm(20));*!/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['evening']}, `;
        }
      }
    } else {
      if(appData.timeOfADay !== 'night') {
        greetBlock.textContent = `${appData.greetingTranslation[lang]['night']}, `;
        appData.timeOfADay = 'night';
        /!*getImage( appData.timeOfADay, getRandomNUm(20));*!/
      } else {
        if(lang !== appData.selectedLang) {
          greetBlock.textContent =  `${appData.greetingTranslation[lang]['night']}, `;
        }
      }
    }*/
  },
  getImage(timeOfADay, pictureNumber) {
    BACKGROUND.style.backgroundImage = `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`;
    allAboutThisPage.currentPicture = pictureNumber;
  },
  getNextPictureNumber(direction, currentPictureNumber){
    //direction = 'next' | 'prev'
    const picturesSum = 20;
    let next;
    if(direction ==='next') {
      next = +currentPictureNumber + 1;
    } else {
      next = +currentPictureNumber - 1;
    }

    if(next < 1){
      return '20';
    } else if(next > 20){
      return '1';
    } else {
      return next.toString();
    }
  },

}

export default ClocksBackground;