import basic from "../actions/commonFunctions.js";
import Base from "./base/Base.js";

export default class Weather extends Base{
  constructor(lang, city, HTMLElements, weatherOptions) {
    super(lang);
    this.city = city;
    this.HTMLElements = HTMLElements;
    this._APIKey = weatherOptions.APIKey;
    this._url = '';
    this._urlToIcon = weatherOptions.urlToIcon;
    this._responseSchema = weatherOptions.responseSchema;
    this._iconTemplate = '';
    this._blocksToHide = weatherOptions.blocksToHide;
  }

  startWeather() {
    this.setUrl();
    this.insertCityNameToHTML();
    this.getWeather();
  }

  setUrl() {
    console.log(this.city);
    this._url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this._APIKey}&lang=${this.lang}&units=metric`;
    return this._url;
  }

  insertCityNameToHTML(){
    this.HTMLElements.cityNameDiv.element.innerHTML = this.city;
  }

  createInput(){
    if(!this.HTMLElements.cityInput){
      this.HTMLElements.cityInput = {};
      this.HTMLElements.cityInput.element = this.createElement('input', 'city-name-input', null, [{'type': 'text'}, {'placeholder': 'Enter the city'}, {'value': `${this.city}`}, {'data-translate': '[placeholder]weather-city-input'}]);
      this.HTMLElements.cityInput.selector = '.city-name-input';
    }
  }

  clearCityBlock(){
    this.HTMLElements.cityNameBlock.element.innerHTML = '';
  }

  displayCityNameInput(){
    this.createInput();
    this.clearCityBlock();
    this.HTMLElements.cityNameBlock.element.appendChild(this.HTMLElements.cityInput.element);
  }

  refreshThisCity(input){
    if(input.value !== this.city) {
      localStorage.setItem('city', `${input.value}`);
      this.city = input.value;
      return true;
    }
  }

  insertDiv(){
    const input = document.querySelector('.city-name-input');
    if(input) {
      this.refreshThisCity(input);
      this.getWeather();
      this.HTMLElements.cityNameBlock.element.innerHTML = '';
      this.HTMLElements.cityNameDiv.element.innerHTML = this.city;
      this.HTMLElements.cityNameBlock.element.appendChild(this.HTMLElements.cityNameDiv.element);
    }
  }

  weatherHandling(event, currentThis){
    const eTargetClassList = [...event.target.classList];
    if(eTargetClassList.includes('city-name-div')) {
      currentThis.displayCityNameInput();

    } else if(!eTargetClassList.includes('city-name-input')){
      currentThis.insertDiv(currentThis);
    }
  }

  getWeather() {
    console.log(this._url);
    this.getData(this._url).then((response) => {
      if (response.isOk) {
        this.HTMLElements.errorBlock.element.innerHTML = "";
        this._blocksToHide.forEach(block => {
          if([...this.HTMLElements[block].element.classList].includes('invisible')) {
            this.HTMLElements[block].element.classList.remove('invisible');
          }
        });
        for(const schemaChunk in this._responseSchema){
          const element = document.querySelector(`${this.HTMLElements[schemaChunk].selector}`);
          if(schemaChunk === 'iconPath') {
            this._iconTemplate = `${this._urlToIcon + response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]][this._responseSchema[schemaChunk][2]]}.png`;
            element.src = this._iconTemplate;
            element.alt = response.json.weather[0].description;
          } else if(schemaChunk === "temperature" || schemaChunk === "windSpeed" || schemaChunk === "humidity") {
            element.innerHTML = Math.round(response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]]);
          } else {
            element.textContent = response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]][this._responseSchema[schemaChunk][2]];
          }
        }
      } else {
        this.HTMLElements.errorBlock.element.innerHTML = "Error! this city was not found. Try another. \n"
            + "Ошибка! Город не найден. Попробуйте другой город";
        this._blocksToHide.forEach(block => this.HTMLElements[block].element.classList.add('invisible'));
      }
    });
  }

  refreshWeatherData(){
    this.setUrl();
    this.getWeather();
    this.insertDiv();
  }

  inputChangeHandler(event, currentThis) {
    console.log('here');
    if(event.key === 'Enter' && [...event.target.classList].includes('city-name-input') ||
    event.type === 'change' && [...event.target.classList].includes('city-name-input')) {
      if(currentThis.refreshThisCity(document.querySelector('.city-name-input'))) {
        this.refreshWeatherData();
      }
    }
  };
}
