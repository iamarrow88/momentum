import Base from "./base/Base.js";

export default class Quotes extends Base {
  constructor(lang, options, HTMLElements) {
    super(lang);
    this._url = options.url;
    this._APIkey = options.APIKey;
    this.basicQuotesArray = options.quotesArray;
    this.quotesArray = [];
    this.source = '';
    this.HTMLElements = HTMLElements;
    this.quotesCounter = 0;
  }

  startQuotes() {
    this.quotesHandler();
  }

  checkSource(){
    if(this.source !== 'API'){
      this.setSource('project');
    }

    return this.source;
  }

  setSource(source){
    if(source === 'API' || source === 'project'){
      this.source = source;
    } else {
      this.source = 'project';
    }

    return this.source;
  }

  isSourceAPI(){
    this.checkSource();
    return this.source === 'API';
  }

  getActualQuotesArray(){
    if(this.isSourceAPI()){
      this.quotesArray = this.getRandomNumber(this._url);
    } else {
      this.quotesArray = this.basicQuotesArray;
    }
    return this.quotesArray;
  }

  animationStart(){
    document.querySelector('div.change-btn').classList.add('refresh');
    this.getActualQuotesArray();
    document.querySelector('div.change-btn').classList.remove('refresh');
  }

  setQuotesCounterValue(n){
    if(n >= this.quotesArray.length) {
      this.quotesCounter = 0;
    } else if(n < 0){
      this.quotesCounter = this.quotesArray.length - 1;
    } else {
      this.quotesCounter = n;
    }

    return this.quotesCounter;
  }

  printQuote(){
    if(!this.HTMLElements.quote.element || !this.HTMLElements.quoteAuthor.element){
      this.HTMLElements.quote.element = document.querySelector('.quote__quote');
      this.HTMLElements.quoteAuthor.element = document.querySelector('.quote__author');
    }

    this.HTMLElements.quote.element.innerHTML = this.quotesArray[this.quotesCounter].text || this.quotesArray[this.quotesCounter].quote;
    this.HTMLElements.quoteAuthor.element.innerHTML = this.quotesArray[this.quotesCounter].author || this.quotesArray[this.quotesCounter].source;
    this.setQuotesCounterValue(this.quotesCounter + 1);
  }

  quotesHandler(){
    this.checkSource();
    this.getActualQuotesArray();
    this.animationStart();
    this.printQuote();
  }


}
