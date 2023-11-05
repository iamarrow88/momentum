import Base from "./base/Base.js";
import localStorageService from "../services/localStorageService.js";

export default class Quotes extends Base {
  constructor(lang, options, HTMLElements) {
    super(lang);
    this._url = options.url;
    this._APIkey = options.APIKey;
    this.basicQuotesArray = options.quotesArray;
    this.quotesArray = [];
    this.source = options.source;
    this.HTMLElements = HTMLElements;
    this.quotesCounter = 0;
  }

  startQuotes() {
    this.quotesHandler();
  }

  checkSource() {
    if (this.source !== "API") {
      this.setQuotesSource("project");
    }
    return this.source;
  }

  setQuotesSource(source) {
    if (source === "API" || source === "project") {
      this.source = source;
    } else {
      this.source = "project";
    }
    localStorageService.setItemToLocalStorage('isSourceAPI_q', this.source);

    return this.source;
  }

  isSourceAPI() {
    this.checkSource();
    return this.source === "API";
  }

  async getActualQuotesArray() {
    if (this.isSourceAPI()) {
      const response = await this.getData(this._url);
      if(response.isOk){
        this.quotesArray = response.json;
      }
    } else {
      this.quotesArray = await this.basicQuotesArray;
    }
    return this.quotesArray;
  }

  animationStart() {
    document.querySelector("div.change-btn").classList.add("refresh");
    this.getActualQuotesArray().then(data => {
      setTimeout(()=> {
        document.querySelector("div.change-btn").classList.remove("refresh");

      }, 1000)
    })
  }

  setQuotesCounterValue(n) {
    if (n >= this.quotesArray.length) {
      this.quotesCounter = 0;
    } else if (n < 0) {
      this.quotesCounter = this.quotesArray.length - 1;
    } else {
      this.quotesCounter = n;
    }

    return this.quotesCounter;
  }

  printQuote() {
    if (
      !this.HTMLElements.quote.element ||
      !this.HTMLElements.quoteAuthor.element
    ) {
      this.HTMLElements.quote.element = document.querySelector(".quote__quote");
      this.HTMLElements.quoteAuthor.element =
        document.querySelector(".quote__author");
    }

    this.HTMLElements.quote.element.innerHTML =
      this.quotesArray[this.quotesCounter].text ||
      this.quotesArray[this.quotesCounter].quote;
    this.HTMLElements.quoteAuthor.element.innerHTML =
      this.quotesArray[this.quotesCounter].author ||
      this.quotesArray[this.quotesCounter].source;
    this.setQuotesCounterValue(this.quotesCounter + 1);
  }

  quotesHandler() {
    this.getActualQuotesArray().then(data => this.printQuote());
    this.animationStart();

  }
}
