import Base from "./base/Base.js";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions) {
    super(lang, name);
    this._translation = clocksOptions.translation;
  constructor(lang, name, clocksOptions, translation, HTMLElements) {
    super(lang, name, HTMLElements);
    this._translation = translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = '';
    this._numberOfPictures = 20;
    this._currentPictureNumber = null;
    this._dateOptions = clocksOptions.dateOptions;
    this._dayMap = clocksOptions.dayMap;
    this.HTMLElements = clocksOptions.HTMLElements;
    this._timeOfADayBorders = clocksOptions.timeOfADayBorders;
  }
  startClocksBackground() {
    this.getTimeAndDate(this.lang);
    this.setDate(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    this.setTimeOfTheDay();
    this.createGreetsBlock();
    const addListenersToBackground = this.changeBackground.bind(this);
    this.massAddEventListeners(this.HTMLElements.background.element, 'click', null, addListenersToBackground)
    this.setTimeAndDateOnPage(this.lang);
    this.basicFunctions.insertDateToHTML(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    console.log('start clocks and background');
  }
  getTimeAndDate(selectedLang) {
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
  getNextPictureNumber(direction, currentPictureNumber, numberOfPictures) {
    // direction = 'next' | 'prev'
    const picturesSum = 20;
    let next;
    if (direction === "next") {
      next = +currentPictureNumber + 1;
      if(next > numberOfPictures) {
        return "01";
      }
    } else {
      next = +currentPictureNumber - 1;
      if(next < 1){
        return numberOfPictures.toString();
      }
    }
    return next.toString();
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

  changeBackground(thisObj, event){
    console.log('here');
    /*стрелочки по смене обоев и инпут (смена в=дива на инпут, сбор данных из инпута, смена инпута на дип обратно*/
    let eTargetClassList = Array.from(event.target.classList);
    const theLastClass = eTargetClassList.length - 1;
    if(eTargetClassList[theLastClass] === 'slide-prev'){
      console.log('slide-prev');
      const pictureNumber = this.getNextPictureNumber('prev'. this._currentPictureNumber, this._numberOfPictures);
      this.setBackgroundImage(this.HTMLElements.background.element, this._timeOfTheDay, pictureNumber);
      //background.getNextPictureNumber(direction, currentPictureNumber, numberOfPictures)
    } else if(eTargetClassList[theLastClass] === 'slide-next') {
      console.log('slide-next');
      const pictureNumber = this.getNextPictureNumber('next'. this._currentPictureNumber, this._numberOfPictures);
      this.setBackgroundImage(this.HTMLElements.background.element, this._timeOfTheDay, pictureNumber);
    } else if(eTargetClassList[0] === 'name'){
      console.log('input');
    }
  }
}