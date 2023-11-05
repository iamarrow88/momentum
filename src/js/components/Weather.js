import Base from "./base/Base.js";
import localStorageService from "../services/localStorageService.js";

export default class Weather extends Base {
  constructor(lang, city, HTMLElements, weatherOptions) {
    super(lang);
    this.city = city;
    this.savedCity = '';
    this.HTMLElements = HTMLElements;
    this._APIKey = weatherOptions.APIKey;
    this._url = "";
    this._urlToIcon = weatherOptions.urlToIcon;
    this._responseSchema = weatherOptions.responseSchema;
    this._iconTemplate = "";
    this._blocksToHide = weatherOptions.blocksToHide;
    this._lastUpdateTime = new Date().getTime();
  }

  startWeather() {
    this.setUrl();
    this.drawCityName(this.HTMLElements.cityNameDiv.element);
    this.getWeather();
  }

  setUrl() {
    this._url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this._APIKey}&lang=${this.lang}&units=metric`;
    return this._url;
  }

  drawCityName(element) {
    element.innerHTML = this.city;
  }

  createWeatherInput() {
    this.HTMLElements.cityNameBlock.element.innerHTML = '';
    this.createElement("label", null, this.HTMLElements.cityNameBlock.element, [
      { for: "city-name" },
    ]);
    this.createElement(
        "input",
        "city-name__input",
        this.HTMLElements.cityNameBlock.element,
        [{ type: "text" }, { id: "city-name" },
          { placeholder: "Enter your city" }, {"data-action": "city-name-input"},
          { "data-translate": "[placeholder]weather-city-input" },
          { value: `${this.city}` }],
    );
  }

  createWeatherDiv() {
    this.HTMLElements.cityNameBlock.element.innerHTML = '';
    const cityName = this.createElement(
        "div",
        "city-name__div",
        this.HTMLElements.cityNameBlock.element,
        [
          { "data-action": "city-name-div" },
        ],
    );
    this.drawCityName(cityName);
    if(this.shouldRefreshWeather()){
      this.refreshWeatherData();
    }
  }

  shouldRefreshWeather() {
    if (this.savedCity !== this.city) {
      localStorageService.setItemToLocalStorage('city', this.city)
      return true;
    }
  }

  weatherHandling(event) {
    if(event.target.dataset.action === 'city-name-div') {
      this.createWeatherInput();
    } else if(event.target.dataset.action !== 'city-name-input' && document.querySelector('.city-name__input') ||
        event.target.dataset.action === 'city-name-input' && event.type === 'change'){
      const value = document.querySelector('.city-name__input').value;
      this.setCityName(value);
      this.createWeatherDiv();
    }
  }

  setCityName(newCityName){
    this.savedCity = this.city;
    if(newCityName === ''){
      document.querySelector('.weather__error-block').innerHTML =
          '<div class="weather-error__text">There is no city name. Try again.</div>' +
          '<div class="weather-error__text">Название города не введено. Попробуйте еще раз</div>';
    } else {
      this.city = newCityName;
    }
    return this.city;
  }

  getWeather() {
    this.getData(this._url).then((response) => {
      if (response.isOk) {
        this.HTMLElements.errorBlock.element.innerHTML = "";
        this._blocksToHide.forEach((block) => {
          if (
            [...this.HTMLElements[block].element.classList].includes(
              "invisible",
            )
          ) {
            this.HTMLElements[block].element.classList.remove("invisible");
          }
        });
        for (const schemaChunk in this._responseSchema) {
          const element = document.querySelector(
            `${this.HTMLElements[schemaChunk].selector}`,
          );
          if (schemaChunk === "iconPath") {
            this._iconTemplate = `${
              this._urlToIcon +
              response.json[this._responseSchema[schemaChunk][0]][
                this._responseSchema[schemaChunk][1]
              ][this._responseSchema[schemaChunk][2]]
            }.png`;
            element.src = this._iconTemplate;
            element.alt = response.json.weather[0].description;
          } else if (
            schemaChunk === "temperature" ||
            schemaChunk === "windSpeed" ||
            schemaChunk === "humidity"
          ) {
            element.innerHTML = Math.round(
              response.json[this._responseSchema[schemaChunk][0]][
                this._responseSchema[schemaChunk][1]
              ],
            );
          } else {
            element.textContent =
              response.json[this._responseSchema[schemaChunk][0]][
                this._responseSchema[schemaChunk][1]
              ][this._responseSchema[schemaChunk][2]];
          }
        }
        this._lastUpdateTime = new Date().getTime();
      } else {
        this.HTMLElements.errorBlock.element.innerHTML =
            '<div class="weather-error__text">Error! this city was not found. Try another.</div>' +
            '<div class="weather-error__text">Ошибка! Город не найден. Попробуйте другой город</div>';
        this._blocksToHide.forEach((block) =>
          this.HTMLElements[block].element.classList.add("invisible"),
        );
      }
    });
  }

  checkLastUpdate(
    updatePerMinutesNumber = 10,
    checkFrequencyMinutesNumber = 1,
  ) {
    const msPerMinute = 60000;
    const timeDelta = msPerMinute * updatePerMinutesNumber * 0.99;
    if (new Date().getTime() - this._lastUpdateTime >= timeDelta) {
      this.getWeather();
      this._lastUpdateTime = new Date().getTime();
    }
    setTimeout(() => {
      this.checkLastUpdate(updatePerMinutesNumber, checkFrequencyMinutesNumber);
    }, checkFrequencyMinutesNumber * msPerMinute);
  }

  refreshWeatherData() {
    this.setUrl();
    this.getWeather();
  }
}
