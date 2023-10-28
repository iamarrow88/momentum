import Base from "./base/Base";
import UnsplashApi from "./unsplashApi";
import getInputValue from "../services/getInputValue.js";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions, translation, HTMLElements) {
    super(lang, name, HTMLElements);
    this._savedLang = '';
    this._savedLang = '';
    this._translation = translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = "";
    this._tag = "";
    this._numberOfPictures = 20;
    this._createImgsIndicator = 0;
    this._currentPictureNumber = null;
    this._dateOptions = clocksOptions.dateOptions;
    this._isAPISource = localStorage.getItem('isSourceAPI') || clocksOptions.isAPISource;
    this._timeOfADayBorders = clocksOptions.timeOfADayBorders;
    this.backgroundCollectionElements = [];
  }

  startClocksBackground() {
    this.setTimeOfTheDay();
    this.createGreetsBlock();
    this.setTimeAndDateOnPage(this.lang);
    this.insertDateToHTML(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    this.createImages(this._numberOfPictures);
    this.loadImages(this._numberOfPictures);
    this.setBackgroundImage();
  }

  setTimeAndDateOnPage(selectedLang) {
    const currentDate = new Date();
    this.insertTimeToHTML(this.HTMLElements.time.element, currentDate);
    if (currentDate.toLocaleTimeString() === "00:00:00") {
      this.insertDateToHTML(currentDate, this.HTMLElements.date.element, this._locales, this._dateOptions);
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.getTimeOfTheDayString(hours, this._timeOfADayBorders);
    if (this._timeOfTheDay !== newTimeOfTheDay) {
      this._timeOfTheDay = newTimeOfTheDay;
      this.loadImages(this._numberOfPictures);
      this.setBackgroundImage();
      this.insertGreetToHTML(this._timeOfTheDay, selectedLang, this._translation, this.HTMLElements.greeting.element);
    }
    setTimeout(() => {
      this.setTimeAndDateOnPage(selectedLang);
    }, 1000);
  }

  setTimeOfTheDay() {
    this._timeOfTheDay = this.getTimeOfTheDayString(new Date().getHours(), this._timeOfADayBorders);
  }

  setLocales(lang) {
    return this._translation[lang].locales;
  }

  set setCurrentPictureNumber(newNumber) {
    if (newNumber < this._numberOfPictures || newNumber >= 0) {
      this._currentPictureNumber = newNumber;
    } else {
      throw new Error("Такого номера для фоновой картинки не существует. Установите другой номер");
    }
  }

  createGreetsBlock() {
    this.HTMLElements.greetsBlock.element.innerHTML = "";
    let greetLine; //span class greeting
    this.HTMLElements.nameBox.element = this.createElement(
        "div",
        "name__box",
        null,
        [],
    );
    let nameLine;
    if (this.name) {
      greetLine = this.createElement(
        "span",
        "greeting",
        this.HTMLElements.greetsBlock.element,
        [{ "data-translate": "hello-name" }],
      );
      nameLine = this.createElement(
        "span",
        "name__div",
        this.HTMLElements.nameBox.element,
        []
      );
    } else {
      greetLine = this.createElement(
        "span",
        "greeting",
        this.HTMLElements.greetsBlock.element,
        [{ "data-translate": "hello-name" }]
      );
      this.createElement(
        "label",
        null,
        this.HTMLElements.greetsBlock.element,
        [{ for: "name" }]
      );
      nameLine = this.createElement(
        "input",
        "name__input",
        this.HTMLElements.nameBox.element,
        [ { type: "text" }, { id: "name" }, { placeholder: "Enter your name" }]
      );
    }
    greetLine.textContent = this._translation[this.lang][`${this._timeOfTheDay}`];
    nameLine.textContent = this.name;
    this.HTMLElements.nameBox.element.innerHTML += '!';
    this.HTMLElements.greetsBlock.element.appendChild(this.HTMLElements.nameBox.element);
  }

  insertDateToHTML(date, dateBlock, locales, dateOptions) {
    dateBlock.textContent = date.toLocaleDateString(locales, dateOptions);
  }

  insertTimeToHTML(timeBlock, currentDate) {
    timeBlock.innerHTML = currentDate.toLocaleTimeString();
  }

  getTimeOfTheDayString(hours, timeOfADayBorders) {
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

  createImages(allPicturesNumber){
    for (let i = 0; i < allPicturesNumber; i++) {
      const img = new Image();
      img.dataset.backgroundId = i;
      img.alt = "background image";
      img.classList.add("carousel__item");
      this.backgroundCollectionElements.push(img);
      this._createImgsIndicator = 1;
    }
  }

  loadImages() {
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
          this.backgroundCollectionElements.forEach((img, i) => {
            img.src = `${result.response.results[i].urls.raw}&fit=crop&w=${window.innerWidth}&h=${window.innerHeight}`;
            img.classList.add("API-image");
            this.HTMLElements.carousel.element.append(img);
          });
        } else {
          this._isAPISource = false;
          this.loadImages(this._numberOfPictures);
        }
      });
    } else {
      for (let i = 0; i < this._numberOfPictures; i++) {
        this.backgroundCollectionElements[i].src = `${this.composeBGPicturePath(this._timeOfTheDay, (i + 1) <= 9 ? `0${i + 1}` : (i + 1).toString())}`;
        if([...this.backgroundCollectionElements[i].classList].includes('API-image')) {
          this.backgroundCollectionElements[i].classList.remove("API-image");
        }
        this.HTMLElements.carousel.element.append(this.backgroundCollectionElements[i]);
      }
    }
  }

  composeBGPicturePath(timeOfADay, pictureNumber) {
    return `https://raw.githubusercontent.com/iamarrow88/bg-collection/main/${timeOfADay}/${pictureNumber}.webp`;
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
    this.backgroundCollectionElements.forEach((block) => block.classList.remove("visible"));
    if(!this.backgroundCollectionElements[pictureNumber]) {
      pictureNumber = 0;
    }
    this.backgroundCollectionElements[pictureNumber].classList.add("visible");
  }

  changeBackground(event) {
    const eTargetClassList = Array.from(event.target.classList);
    const theLastClassNumber = eTargetClassList.length - 1;
    let direction;
    if (eTargetClassList.includes("slider-icon")) {
      if (eTargetClassList[theLastClassNumber] === "slide-next") {
        direction = "next";
      } else if (eTargetClassList[theLastClassNumber] === "slide-prev") {
        direction = "prev";
      }
      const pictureNumber = this.getNextPictureNumber(direction, this._currentPictureNumber, this._numberOfPictures);
      this.setBackgroundImage(pictureNumber);
    } else if (eTargetClassList[0] === "name") {
    } else if(eTargetClassList.includes('settings-icon')) {
      this.HTMLElements.settingsBlock.element.classList.toggle('visible');;
    } else if(eTargetClassList.includes('api')) {
      localStorage.setItem('isSourceAPI', true);
      this._isAPISource = true;
      this.loadImages(this._numberOfPictures);
      this.setBackgroundImage();
      this.HTMLElements.settingsBlock.element.classList.toggle('visible');
    } else if(eTargetClassList.includes('github')) {
      localStorage.setItem('isSourceAPI', false);
      this._isAPISource = false;
      this.loadImages(this._numberOfPictures);
      this.setBackgroundImage();
      this.HTMLElements.settingsBlock.element.classList.toggle('visible');
    }
  }

  setCustomerName(newName){
    this.name = newName;
    return this.name;
  }

  refreshLocalStorageName(newName){
    localStorage.setItem('name', newName);
    return true;
  }

  deleteLocalStorageName(){
    localStorage.removeItem('name');
    return true;
  }

  isItDivCheck(){
    let res;
    if(document.querySelector('.name__input')){
      res = false;
    } else if(document.querySelector('.name__div')){
      res = true;
    } else {
      res = true;
    }

    this.HTMLElements.nameBox.element = document.querySelector('.name__box').innerHTML = '';
    return res;
  }
  /**
   * @param проверяет ;
   * */
  /*createNameBox(){
    let box;
    if(this.isItDivCheck()){
      if(!this.HTMLElements.nameInput || !this.HTMLElements.nameInput.element){
        this.HTMLElements.nameInput.element = this.createElement('input', 'name__input', null, [{'id': 'name'}, {'type': 'text'}, {}]);
        this.HTMLElements.nameInput.selector = '.name__input';
      }
      box = this.HTMLElements.nameInput.element;
      box.value = this.name;

    } else {
      if(!this.HTMLElements.nameDiv || !this.HTMLElements.nameDiv.element){
        this.HTMLElements.nameDiv.element = this.createElement('span', 'name__div', null, null);
        this.HTMLElements.nameDiv.selector = '.name__div';
      }
      box = this.HTMLElements.nameDiv.element;
      box.innerHTML = this.name;
    }
    this.HTMLElements.nameBox.element.innerHTML = '';
    this.HTMLElements.nameBox.element.appendChild(box);

    return box;
  }*/
  /**
   * @param {HTMLElement} child can be only HTML element;
   * @param {HTMLElement} parent can be only HTML element; always returns true
   * */
  addNewElementToParent(child, parent){
    parent.appendChild(child);
    return true;
  }

  nameHandler(e){
    if(e.target.nodeName !== 'INPUT' || e.type === 'change'){

      const value = getInputValue(document.querySelector('.name__input'));
      if(value) {
        this.setCustomerName(value);
        this.setCustomerName(this.name);
        this.refreshLocalStorageName(this.name);
        document.querySelector('.name__box').innerHTML = '';

        if(!this.HTMLElements.nameDiv || !this.HTMLElements.nameDiv.element){
          this.HTMLElements.nameDiv.element = this.createElement('span', 'name__div', null, null);
          this.HTMLElements.nameDiv.selector = '.name__div';
        }
        this.HTMLElements.nameDiv.element.innerHTML = this.name;

        this.HTMLElements.nameBox.element.appendChild(this.HTMLElements.nameDiv.element);
      } else {
        if([...e.target.classList].includes('name__div')) {
          e.target.innerHTML = '';
          if(!this.HTMLElements.nameInput || !this.HTMLElements.nameInput.element){
            this.HTMLElements.nameInput.element = this.createElement('input', 'name__input', null, [{'placeholder': `Enter your name`}, {'data-translate': '[placeholder]customerName'}, {'type': 'text'}, {'id': 'name'}, {"onfocus":"this.value=''"}]);
            this.HTMLElements.nameInput.selector = '.name__input';
          }
          this.HTMLElements.nameInput.element.value = this.name;
          e.target.appendChild(this.HTMLElements.nameInput.element);
        }
      }

    }
  }
}
