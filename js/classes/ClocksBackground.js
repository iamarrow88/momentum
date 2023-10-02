import Base from "./base/Base.js";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions, translation, HTMLElements) {
    super(lang, name, HTMLElements);
    this._translation = translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = '';
    this._numberOfPictures = 20;
    this._currentPictureNumber = null;
    this._dateOptions = clocksOptions.dateOptions;
    this._timeOfADayBorders = clocksOptions.timeOfADayBorders;
    this.basicFunctions = new Base(this.lang, this.name, this.city);
  }
  startClocksBackground() {
    this.setTimeOfTheDay();
    this.createGreetsBlock();
    this.setTimeAndDateOnPage(this.lang);
    this.basicFunctions.insertDateToHTML(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    this.setBackgroundImage();
    console.log('start clocks and background');
  }
  setBackgroundImage(pictureNumber){
    if(!pictureNumber){
      pictureNumber = this.basicFunctions.getRandomNumber(this._numberOfPictures);
    }
    this._currentPictureNumber = pictureNumber;
    const pathToBG = this.composeBGPicturePath(this._timeOfTheDay, pictureNumber);
    this.setBackgroundImageSrc(this.HTMLElements.background.element, pathToBG);
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
  }

  composeBGPicturePath(timeOfADay, pictureNumber){
    return `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`
  }

  setBackgroundImageSrc(block, path) {
    block.style.backgroundImage = path;
  }

  getNextPictureNumber(direction, currentPictureNumber, allPicturesNumber) {
    // direction = 'next' | 'prev'
    let next;
    if (direction === "next") {
      next = +currentPictureNumber + 1;
      if(next > allPicturesNumber) {
        return "01";
      }
    } else {
      next = +currentPictureNumber - 1;
      if(next < 1){
        return allPicturesNumber.toString();
      }
    }
    if(next <= 9){
      return '0' + next;
    } else {
      return next.toString();
    }
  }

  changeBackground(event, newThis){
    /*const basicFunctions = new Base();*/
    /*стрелочки по смене обоев и инпут (смена в=дива на инпут, сбор данных из инпута, смена инпута на дип обратно*/
    let eTargetClassList = Array.from(event.target.classList);
    const theLastClassNumber = eTargetClassList.length - 1;
    let direction;
    if(eTargetClassList.includes('slider-icon')){
      if (eTargetClassList[theLastClassNumber] === 'slide-next') {
        direction = 'next';
      } else if (eTargetClassList[theLastClassNumber] === 'slide-prev') {
        direction = 'next';
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