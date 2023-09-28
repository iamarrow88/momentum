const Quotes = {
  fields: {
    lang: '',
    APIKey: '',
    url: '',
    quotesArray: []
  },
  start(lang, quotesAPIKey, quotesUrl, quotesArray) {
    this.fields.lang = lang;
    this.fields.APIKey = quotesAPIKey;
    this.fields.url = quotesUrl;
    this.fields.quotesArray = quotesArray;
    console.log('quotes started');
  }
}

export default Quotes;