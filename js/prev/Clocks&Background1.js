import basic from "../actions/commonFunctions.js";
import appData from "../data/appData.js";

const ClocksBackground1 = {
  fields: {
    lang: "",
    locales: "",
    name: null,
    timeOfTheDay: null,
    currentPictureNumber: "01",
    dayMap: {
      morning: {
        start: 5,
        end: 11,
      },
      afternoon: {
        start: 12,
        end: 17,
      },
      evening: {
        start: 18,
        end: 19,
      },
      night1: {
        start: 23,
        end: 23,
      },
      night2: {
        start: 0,
        end: 4,
      },
    },
    HTMLElements: {
      time: ".time",
      date: ".date",
      greeting: ".greeting",
      name: ".name",
      prev: ".slide-prev",
      next: ".slide-next",
      background: ".body",
    },
    numberOfPictures: 20,
  },
  start(lang, name, locales, dateOptions) {
    this.fields.lang = lang;
    this.fields.name = name;
    this.fields.locales = locales;
    this.fields.dateOptions = dateOptions;
    basic.searchHTMLElements.call(this);
    this.getTimeAndDate(this.fields.lang);
    this.setDate(new Date(), this.fields.lang, this.fields.HTMLElements.date, this.fields.locales, this.fields.dateOptions);
  },
  getTimeAndDate(lang) {
    const currentDate = new Date();
    this.fields.HTMLElements.time.innerHTML = currentDate.toLocaleTimeString();
    if (currentDate.toLocaleTimeString() === "00:00:00") {
      this.setDate(currentDate, this.fields.lang, this.fields.locales, this.fields.dateOptions);
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.checkTimeOfTheDay(hours);
    if (this.fields.timeOfTheDay !== newTimeOfTheDay) {
      this.fields.timeOfTheDay = newTimeOfTheDay;
      this.greet(this.fields.timeOfTheDay, this.fields.lang, appData, this.fields.HTMLElements.greeting);
    }
    setTimeout(() => {
      this.getTimeAndDate(ClocksBackground1.fields.lang);
    }, 1000);
  },
  setDate(date, lang, dateBlock, locales, dateOptions) {
    dateBlock.textContent = date.toLocaleDateString(this.fields.locales, dateOptions);
  },
  greet(timeOfTheDay, lang, appData, greetBlock) {
    let result;
    switch (timeOfTheDay) {
      case "morning":
        result = "morning";
        break;
      case "afternoon":
        result = "afternoon";
        break;
      case "evening":
        result = "evening";
        break;
      case "night":
        result = "night";
        break;
    }
    greetBlock.textContent = `${appData.translation[lang][`${result}`]}, `;
    const pictureNumber = this.getRandomNumber(this.fields.numberOfPictures);
    this.setBackgroundImage(this.fields.HTMLElements.background, this.fields.timeOfTheDay, pictureNumber, this.fields);
  },
  checkTimeOfTheDay(hours) {
    for (const time in this.fields.dayMap) {
      if (hours >= this.fields.dayMap[time].start && hours <= this.fields.dayMap[time].end) {
        if (time === "night1" || time === "night2") {
          return "night";
        }
        return time;
      }
    }
  },
  setBackgroundImage(block, timeOfADay, pictureNumber, appData) {
    block.style.backgroundImage = `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`;
    appData.currentPictureNumber = pictureNumber;
  },
  getRandomNumber(n) {
    let num = Math.floor(Math.random() * n + 1).toString();
    if (num < 10) num = 0 + num;
    return num;
  },
  getNextPictureNumber(direction, currentPictureNumber) {
    // direction = 'next' | 'prev'
    const picturesSum = 20;
    let next;
    if (direction === "next") {
      next = +currentPictureNumber + 1;
    } else {
      next = +currentPictureNumber - 1;
    }

    if (next < 1) {
      return "20";
    } if (next > 20) {
      return "1";
    }
    return next.toString();
  },
};

/*
export default ClocksBackground1;
*/
