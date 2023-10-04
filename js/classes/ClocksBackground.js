import Base from "./base/Base.js";
import * as path from "path";
import UnsplashApi from "./unsplashApi";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions, translation, HTMLElements) {
    super(lang, name, HTMLElements);
    this._translation = translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = '';
    this._tag = "";
    this._numberOfPictures = 20;
    this._currentPictureNumber = null;
    this._dateOptions = clocksOptions.dateOptions;
    this._isAPISource = clocksOptions.isAPISource;
    this._timeOfADayBorders = clocksOptions.timeOfADayBorders;
    this.basicFunctions = new Base(this.lang, this.name, this.city);
    this.backgroundCollectionElements = [];
  }
  startClocksBackground() {
    this.setTimeOfTheDay();
    this.createGreetsBlock();
    this.setTimeAndDateOnPage(this.lang);
    this.basicFunctions.insertDateToHTML(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    this.loadImages(this._numberOfPictures);
    this.setBackgroundImage();
    console.log('start clocks and background');
  }

  setTimeAndDateOnPage(selectedLang) {
    const currentDate = new Date();
    this.basicFunctions.insertTimeToHTML(this.HTMLElements.time.element, currentDate)
    if (currentDate.toLocaleTimeString() === "00:00:00") {
      this.basicFunctions.insertDateToHTML(currentDate, this.HTMLElements.date.element, this._locales, this._dateOptions);
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.basicFunctions.getTimeOfTheDayString(hours, this._timeOfADayBorders);
    if (this._timeOfTheDay !== newTimeOfTheDay) {
      this._timeOfTheDay = newTimeOfTheDay;
      this.loadImages(this._numberOfPictures);
      this.setBackgroundImage();
      this.basicFunctions.insertGreetToHTML(this._timeOfTheDay, selectedLang, this._translation, this.HTMLElements.greeting.element);
    }
    setTimeout(() => {
      this.setTimeAndDateOnPage(selectedLang);
    }, 1000);
  }
  setTimeOfTheDay(){
    this._timeOfTheDay = this.basicFunctions.getTimeOfTheDayString(new Date().getHours(), this._timeOfADayBorders);
  }
  setLocales(lang) {
    return this._translation[lang].locales;
  }
  set setCurrentPictureNumber(newNumber){
    if(newNumber < this._numberOfPictures || newNumber >= 0) {
      this._currentPictureNumber = newNumber;
    } else {
      throw new Error('Такого номера для фоновой картинки не существует. Установите другой номер');
    }
  }

  createGreetsBlock(){
    this.HTMLElements.greetsBlock.element.innerHTML = '';
    let greetLine;
    let nameLine;
    if(this.name){
      greetLine = this.createElement(
          'div',
          'greeting',
          this.HTMLElements.greetsBlock.element,
          [{"data-translate": "hello-name"}]);
      nameLine = this.createElement(
          'span',
          'name',
          null,
          [{"data-translate": "[placeholder]customerName}"}]);
    } else {
      greetLine = this.createElement(
          'span',
          'greeting',
          this.HTMLElements.greetsBlock.element,
          [{"data-translate": "hello-name"}]);
      this.createElement(
          'label',
          null,
          this.HTMLElements.greetsBlock.element,
          [{'for': 'name'}]
      )
      nameLine = this.createElement(
          'input',
          'name',
          this.HTMLElements.greetsBlock.element,
          [{"data-translate": "[placeholder]customerName"}, {"type": "text"}, {"id": "name"}, {'placeholder': 'Enter your name'}]);
    }

    greetLine.textContent = this._translation[this.lang][`${this._timeOfTheDay}`];
    nameLine.textContent = this.name;
    if(this.name) greetLine.appendChild(nameLine);

  insertDateToHTML(date, dateBlock, locales, dateOptions) {
    dateBlock.textContent = date.toLocaleDateString(locales, dateOptions);
  }

  insertTimeToHTML(timeBlock, currentDate) {
    timeBlock.innerHTML = currentDate.toLocaleTimeString();
  }

  getTimeOfTheDayString(hours, timeOfADayBorders) {
    /*const keys = Object.keys(timeOfADayBorders);
    for (let i = 0; i < keys.length; i + 1) {
      if (hours >= timeOfADayBorders[keys[i]].start && hours <= timeOfADayBorders[keys[i]].end) {
        if (keys[i] === "night1" || keys[i] === "night2") {
          return "night";
        }
        return keys[i];
      }
    }*/
    for (const time in timeOfADayBorders) {
      if (hours >= timeOfADayBorders[time].start && hours <= timeOfADayBorders[time].end) {
        if (time === "night1" || time === "night2") {
          return "night";
        }
        return time;
      }
    }
  }

  insertGreetToHTML(timeOfTheDay, lang, translation, greetBlock) {
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
    greetBlock.innerHTML = `${translation[lang][result]} `;
  }

  loadImages(allPicturesNumber) {
    this.HTMLElements.carousel.element.innerHTML = "";
    if (this._isAPISource) {
      let api;
      if (this._tag) {
        api = new UnsplashApi(`${this._tag}`);
      } else {
        api = new UnsplashApi(`${this._timeOfTheDay}, nature`);
      }

      api.getPhotoByTag().then((result) => {
        if (result.status === 200) {
          console.log("data from unsplash api is received");
          this.backgroundCollectionElements.forEach((img, i) => {
            img.src = `${result.response.results[i].urls.raw}&fit=crop&w=${window.innerWidth}&h=${window.innerHeight}`;
            img.classList.add("itWasAPI");
          });
        } else {
          console.log("fail, data from unsplash is not received");
          this._isAPISource = false;
          this.loadImages(this._numberOfPictures);
        }
      });
    }
    for (let i = 0; i < allPicturesNumber; i++) {
      const img = new Image();
      img.dataset.backgroundId = i;
      img.alt = "background image";
      img.classList.add("carousel__item");

      if (!this._isAPISource) {
        img.src = `${this.composeBGPicturePath(this._timeOfTheDay, (i + 1) <= 9 ? `0${i + 1}` : (i + 1).toString())}`;
      }
      this.backgroundCollectionElements.push(img);

      this.HTMLElements.carousel.element.append(img);
    }
  }

  composeBGPicturePath(timeOfADay, pictureNumber){
    /*return `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`*/
    return `https://raw.githubusercontent.com/iamarrow88/bg-collection/main/${timeOfADay}/${pictureNumber}.webp`
  }

  getNextPictureNumber(direction, currentPictureNumber, allPicturesNumber) {
    let nextPictureID;
    if (direction === "next") {
      nextPictureID = +currentPictureNumber + 1;
      if (nextPictureID >= allPicturesNumber) {
        return 0;
      }
    } else {
      nextPictureID = +currentPictureNumber - 1;
      if (nextPictureID < 1) {
        return +(allPicturesNumber - 1);
      }
    }
    return +nextPictureID;
  }

  setBackgroundImage(pictureNumber) {
    if (!pictureNumber) {
      if(pictureNumber !== 0){
        pictureNumber = this.getRandomNumber(this._numberOfPictures);
      }
    }
    this._currentPictureNumber = pictureNumber;
    this.backgroundCollectionElements.forEach(block => block.classList.remove('visible'));
    this.backgroundCollectionElements[pictureNumber].classList.add('visible');
  }

  changeBackground(event, newThis){
    /*стрелочки по смене обоев и инпут (смена в=дива на инпут, сбор данных из инпута, смена инпута на дип обратно*/
    let eTargetClassList = Array.from(event.target.classList);
    const theLastClassNumber = eTargetClassList.length - 1;
    let direction;
    if(eTargetClassList.includes('slider-icon')){
      if (eTargetClassList[theLastClassNumber] === 'slide-next') {
        direction = 'next';
      } else if (eTargetClassList[theLastClassNumber] === 'slide-prev') {
        direction = 'prev';
      }
      const pictureNumber = newThis.getNextPictureNumber(direction, newThis._currentPictureNumber, newThis._numberOfPictures);
      this.setBackgroundImage(pictureNumber);
    } else if(eTargetClassList[0] === 'name'){
      console.log('input');
    } else {
      console.log('no matches');
    }
  }
}