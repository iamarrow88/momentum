import Base from "./base/Base";
import UnsplashApi from "./unsplashApi";
import getInputValue from "../services/getInputValue.js";
import localStorageService from "../services/localStorageService.js";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions, translation, HTMLElements) {
    super(lang, name, HTMLElements);
    this._savedLang = "";
    this._translation = translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = "";
    this._tag = "";
    this._numberOfPictures = 20;
    this._createImgsIndicator = 0;
    this._currentPictureNumber = null;
    this._dateOptions = clocksOptions.dateOptions;
    this._isAPISource = clocksOptions.isAPISource;
    this._timeOfADayBorders = clocksOptions.timeOfADayBorders;
    this.backgroundCollectionElements = [];
    this.isSettingsOpen = false;
  }
  startClocksBackground() {
    this.setTimeOfTheDay();
    this.firstGreetBlockCreate();
    this.setTimeAndDateOnPage(this.lang);
    this.insertDateToHTML(
      new Date(),
      this.HTMLElements.date.element,
      this._locales,
      this._dateOptions,
    );
    this.checkIsAPISource();
    this.createImages(this._numberOfPictures);
    this.loadImages(this._numberOfPictures);
    this.setBackgroundImage();
  }

  checkIsAPISource(){
    const LSSource = localStorage.getItem("isSourceAPI_bg");
    if(LSSource === false || LSSource === 'false') {
      this._isAPISource = false;
    } else if(LSSource == 'true') {
      this._isAPISource = true;
    }
  }

  setTimeAndDateOnPage(selectedLang) {
    const currentDate = new Date();
    this.insertTimeToHTML(this.HTMLElements.time.element, currentDate);
    if (currentDate.toLocaleTimeString() === "00:00:00") {
      this.insertDateToHTML(
        currentDate,
        this.HTMLElements.date.element,
        this._locales,
        this._dateOptions,
      );
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.getTimeOfTheDayString(
      hours,
      this._timeOfADayBorders,
    );
    if (this._timeOfTheDay !== newTimeOfTheDay) {
      this._timeOfTheDay = newTimeOfTheDay;
      this.loadImages(this._numberOfPictures);
      this.setBackgroundImage();
      this.insertGreetToHTML(
        this._timeOfTheDay,
        selectedLang,
        this._translation,
        this.HTMLElements.greeting.element,
      );
    }
    setTimeout(() => {
      this.setTimeAndDateOnPage(selectedLang);
    }, 1000);
  }

  setTimeOfTheDay() {
    this._timeOfTheDay = this.getTimeOfTheDayString(
      new Date().getHours(),
      this._timeOfADayBorders,
    );
  }

  setLocales(lang) {
    return this._translation[lang].locales;
  }

  set setCurrentPictureNumber(newNumber) {
    if (newNumber < this._numberOfPictures || newNumber >= 0) {
      this._currentPictureNumber = newNumber;
    } else {
      throw new Error(
        "Такого номера для фоновой картинки не существует. Установите другой номер",
      );
    }
  }


  createGreetsDiv(){
    this.HTMLElements.nameBox.element.innerHTML = "";
    let nameLine = this.createElement(
        "div",
        "name__div",
        this.HTMLElements.nameBox.element,
        [{"data-action": "name__div"}],
    );
    nameLine.textContent = this.name;
  }

  createGreetsInput(){
    this.HTMLElements.nameBox.element.innerHTML = "";
    this.createElement("label", null, this.HTMLElements.nameBox.element, [
      { for: "name" },
    ]);
    const nameLine = this.createElement(
        "input",
        "name__input",
        this.HTMLElements.nameBox.element,
        [{ type: "text" }, { id: "name" },
          { placeholder: "Enter your name" }, {"data-action": "name__input"},
          { "data-translate": "[placeholder]customerName" },
          { value: `${this.name}` }],
    );
  }

  firstGreetBlockCreate(){
    this.name ? this.createGreetsDiv() : this.createGreetsInput();
  }

  createGreetsBlock() {

    let nameLine;
    const input = document.querySelector(`[data-action="name__input"]`);
    this.HTMLElements.nameBox.element.innerHTML = "";
    if (input) {
      if(input.value !== ''){
        this.name = input.value;
        localStorageService.setItemToLocalStorage('name', this.name);

      }
      this.createGreetsDiv();

    } else {
      this.createGreetsInput();
    }
    /*nameLine.textContent = this.name;
    this.HTMLElements.nameBox.element.appendChild(nameLine);*/
  }

  insertDateToHTML(date, dateBlock, locales, dateOptions) {
    dateBlock.textContent = date.toLocaleDateString(locales, dateOptions);
  }

  insertTimeToHTML(timeBlock, currentDate) {
    timeBlock.innerHTML = currentDate.toLocaleTimeString();
  }

  getTimeOfTheDayString(hours, timeOfADayBorders) {
    for (const time in timeOfADayBorders) {
      if (
        hours >= timeOfADayBorders[time].start &&
        hours <= timeOfADayBorders[time].end
      ) {
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

  createImages(allPicturesNumber) {
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
        this.backgroundCollectionElements[i].src = `${this.composeBGPicturePath(
          this._timeOfTheDay,
          i + 1 <= 9 ? `0${i + 1}` : (i + 1).toString(),
        )}`;
        if (
          [...this.backgroundCollectionElements[i].classList].includes(
            "API-image",
          )
        ) {
          this.backgroundCollectionElements[i].classList.remove("API-image");
        }
        this.HTMLElements.carousel.element.append(
          this.backgroundCollectionElements[i],
        );
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
      if (pictureNumber !== 0) {
        pictureNumber = this.getRandomNumber(this._numberOfPictures);
      }
    }
    this._currentPictureNumber = pictureNumber;
    this.backgroundCollectionElements.forEach((block) =>
      block.classList.remove("visible"),
    );
    if (!this.backgroundCollectionElements[pictureNumber]) {
      pictureNumber = 0;
    }
    this.backgroundCollectionElements[pictureNumber].classList.add("visible");
  }

  changeBackground(event) {
    const dataset = event.target.dataset.action;
    switch (dataset) {
      case 'slide-next':
      case 'slide-prev': {
        const direction = "slide-next" ? "next" : "prev";
        const pictureNumber = this.getNextPictureNumber(
            direction,
            this._currentPictureNumber,
            this._numberOfPictures,
        );
        this.setBackgroundImage(pictureNumber);
        break;
      }

      case 'settings-icon': {
        this.isSettingsOpen ? this.HTMLElements.settingsBlock.element.classList.remove("visible") :
            this.HTMLElements.settingsBlock.element.classList.add("visible");
        this.isSettingsOpen = !this.isSettingsOpen;
        break;
      }

      case 'another-element': {
        this.HTMLElements.settingsBlock.element.classList.remove("visible");
        this.isSettingsOpen = false;
        break;
      }

      case 'settings-edit-data-btn': {
        console.log('settings-edit-data-btn.log');
        document.querySelector('#edit-block').classList.toggle('visible');
        break;
      }

      case 'settings-change-lang-ru': {

      }
    }
    /*const eTargetClassList = Array.from(event.target.classList);
    if (event.target.dataset.action === 'slide-next' || event.target.dataset.action === 'slide-prev') {
      const direction = "slide-next" ? "next" : "prev";
      const pictureNumber = this.getNextPictureNumber(
        direction,
        this._currentPictureNumber,
        this._numberOfPictures,
      );
      this.setBackgroundImage(pictureNumber);
    } else if (eTargetClassList[0] === "name") {
    } else if (event.target.dataset.action === "settings-icon") {
      this.HTMLElements.settingsBlock.element.classList.toggle("visible");
    } else if(event.target.dataset.action === 'settings-edit-data-btn'){
      console.log('settings-edit-data-btn.log');
      document.querySelector('#edit-block').classList.toggle('visible');
    }*/
  }

  setCustomerName(newName) {
    if(newName !== ''){
      this.name = newName;
    } else {
      console.log('Имя не может быть пустым. Пробуйте ввести его еще раз');
    }
    return this.name;
  }

  nameHandler(e){
    if(e.target.dataset.action === 'name__div'){
      this.createGreetsBlock();
    } else if(e.target.dataset.action !== 'name__input' && document.querySelector('.name__input') ||
        e.target.dataset.action === 'name__input' && e.type === "change"){
      const value = getInputValue(document.querySelector(".name__input"));
      this.setCustomerName(value);
      localStorageService.setItemToLocalStorage('name', this.name);
      this.createGreetsBlock();
    }
  }

  blockLayoutsAction(action){
    const blocksSelectors = ['.player', '.weather', '.time',
      '.date', '.greeting-container', '.motivation-block', '.quote'];
    if(action === 'on'){
      blocksSelectors.forEach(selector => {
        document.querySelector(selector).classList.add('dark-layout');
      })
    } else if(action === 'off'){
      blocksSelectors.forEach(selector => {
        document.querySelector(selector).classList.remove('dark-layout');
      })
    } else {
      console.log('не выбрано действие с подложками блоков. Проверьте');
    }
  }
}
