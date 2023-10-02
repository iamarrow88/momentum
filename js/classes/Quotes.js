import Base from "./base/Base.js";

export default class Quotes extends Base{
  constructor(lang, options) {
    super(lang);
    this._url = options.url;
    this._APIkey = options.APIKey;
    this.quotesStack = options.quotesArray;
  }

  startQuotes(){
    console.log('start quotes');
  }
}