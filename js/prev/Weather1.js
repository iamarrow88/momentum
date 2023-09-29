import asyncFunctions from "../actions/asyncFunctions.js";
import basic from "../actions/commonFunctions.js";

const Weather1 = {
  fields: {
    city: "",
    lang: "",
    APIKey: "",
    url: "",
    iconTemplate: "a",
    responseData: {
      iconPath: ["weather", "0", "icon"],
      description: ["weather", "0", "description"],
      temperature: ["main", "temp"],
      humidity: ["main", "humidity"],
      windSpeed: ["wind", "speed"],
    },
    HTMLElements: {
      errorBlock: ".weather__error-block",
      iconPath: ".weather-icon",
      temperature: ".temperature__number",
      description: ".weather-description",
      windSpeed: ".wind__speedNumber",
      humidity: ".humidity__number",
      cityNameBlock: ".city-name-block",
    },
    urlToIcon: "https://openweathermap.org/img/wn/",
  },
  start(city, lang, weatherAPIKey) {
    this.fields.city = city;
    this.fields.lang = lang;
    this.fields.APIKey = weatherAPIKey;
    this.setUrl();
    basic.searchHTMLElements.call(this);
    this.setCityName();
    this.getWeather();
  },
  setUrl() {
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.fields.city}&APPID=${this.fields.APIKey}&lang=${this.fields.lang}&units=metric`;
  },
  setCityName() {
    this.fields.HTMLElements.cityNameBlock.innerHTML = this.fields.city;
  },
  getWeather() { // найти содержимое ответа и вставить в хтмл элемент + city in input
    asyncFunctions.getValue(this.url).then((response) => {
      if (response.isOk) {
        this.fields.HTMLElements.errorBlock = "";
        for (const data in this.fields.responseData) {
          if (this.fields.responseData[data].length === 2) {
            if (data === "iconPath") {
              this.fields.iconTemplate = `${this.fields.urlToIcon + response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]]}.png`;
              this.fields.HTMLElements[data].src = this.fields.iconTemplate;
              this.fields.HTMLElements[data].alt = response.json.weather[0].description;
            } else if (data === "temperature" || data === "windSpeed" || data === "humidity") {
              this.fields.HTMLElements[data].innerHTML = Math.round(response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]]);
            } else {
              this.fields.HTMLElements[data].innerHTML = response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]];
            }
          } else if (data === "iconPath") {
            this.fields.iconTemplate = `${this.fields.urlToIcon + response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]][this.fields.responseData[data][2]]}.png`;
            this.fields.HTMLElements[data].src = this.fields.iconTemplate;
            this.fields.HTMLElements[data].alt = response.json.weather[0].description;
          } else if (data === "temperature" || data === "windSpeed" || data === "humidity") {
            this.fields.HTMLElements[data].innerHTML = Math.round(response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]][this.fields.responseData[data][2]]);
          } else {
            this.fields.HTMLElements[data].innerHTML = response.json[this.fields.responseData[data][0]][this.fields.responseData[data][1]][this.fields.responseData[data][2]];
          }
        }
      } else if (this.fields.lang) {
        this.fields.HTMLElements.errorBlock = "Error! this city was not found. Try another. \n"
            + "Ошибка! Город не найден. Попробуйте другой город";
      }
    });
  },
};

export default Weather1;
