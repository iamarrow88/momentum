import Base from "./base/Base.js";

export default class ClocksBackground extends Base {
  constructor(lang, name, clocksOptions) {
    super(lang, name);
    this._translation = clocksOptions.translation;
    this._locales = this.setLocales(this.lang);
    this._timeOfTheDay = '';
    this._numberOfPictures = 20;
    this._dateOptions = clocksOptions.dateOptions;
    this._dayMap = clocksOptions.dayMap;
    this.HTMLElements = clocksOptions.HTMLElements;
  }
  startClocksBackground() {
    this.getTimeAndDate(this.lang);
    this.setDate(new Date(), this.HTMLElements.date.element, this._locales, this._dateOptions);
    this.createGreetsBlock();
    const addListenersToBackground = this.changeBackground.bind(this);
    this.massAddEventListeners(this.HTMLElements.background.element, 'click', null, addListenersToBackground)
  }
  getTimeAndDate(selectedLang) {
    const currentDate = new Date();
    this.HTMLElements.time.element.innerHTML = currentDate.toLocaleTimeString();
    if (currentDate.toLocaleTimeString() === "00:00:00") {
      this.setDate(currentDate, this.HTMLElements.date.element, this._locales, this._dateOptions);
    }
    const hours = currentDate.getHours();
    const newTimeOfTheDay = this.checkTimeOfTheDay(hours);
    if (this._timeOfTheDay !== newTimeOfTheDay) {
      this._timeOfTheDay = newTimeOfTheDay;
      this.greet(this._timeOfTheDay, selectedLang, this._translation, this.HTMLElements.greeting.element);
    }
    setTimeout(() => {
      this.getTimeAndDate(selectedLang);
    }, 1000);
  }
  setDate(date, dateBlock, locales, dateOptions) {
    dateBlock.textContent = date.toLocaleDateString(locales, dateOptions);
  }
  checkTimeOfTheDay(hours) {
    for (const time in this._dayMap) {
      if (hours >= this._dayMap[time].start && hours <= this._dayMap[time].end) {
        if (time === "night1" || time === "night2") {
          return "night";
        }
        return time;
      }
    }
  }
  greet(timeOfTheDay, lang, translation, greetBlock) {
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
    greetBlock.textContent = `${translation[lang][`${result}`]}, `;
    const pictureNumber = this.getRandomNumber(this._numberOfPictures);
    this.setBackgroundImage(this.HTMLElements.background.element, this._timeOfTheDay, pictureNumber);
  }

  setBackgroundImage(block, timeOfADay, pictureNumber) {
    block.style.backgroundImage = `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`;
    this._currentPictureNumber = pictureNumber;
  }
  setLocales(lang) {
    return this._translation[lang].locales;
  }

  getRandomNumber(n) {
    let num = Math.floor(Math.random() * n + 1).toString();
    if (num < 10) num = 0 + num;
    return num;
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
    this._timeOfTheDay = this.checkTimeOfTheDay(new Date().getHours());
    let greetLine;
    let nameLine;
    if(this.name){
      console.log(`name is ${this.name}`);
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
      console.log('no name');
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