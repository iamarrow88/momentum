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

  }

  startWeather() {
    this.setUrl();
    this.insertCityNameToHTML();
    this.getWeather();
    console.log('weather started');
  }

  setUrl() {
    this._url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this._APIKey}&lang=${this.lang}&units=metric`;
    return this._url;
  }

  insertCityNameToHTML(){
    this.HTMLElements.cityNameDiv.element.innerHTML = this.city;
  }


  weatherHandling(event, currentThis){
    const eTargetClassList = [...event.target.classList];
    if(eTargetClassList.includes('city-name-div')) {
      console.log('city-name-div');
      if(!currentThis.HTMLElements.cityInput){
        currentThis.HTMLElements.cityInput = {};
        currentThis.HTMLElements.cityInput.element = currentThis.createElement('input', 'city-name-input', null, [{'type': 'text'}, {'placeholder': 'Enter the city'}, {'value': `${currentThis.city}`}, {'data-translate': '[placeholder]weather-city-input'}]);
        currentThis.HTMLElements.cityInput.selector = '.city-name-input';
      }
      currentThis.HTMLElements.cityNameBlock.element.innerHTML = '';
      currentThis.HTMLElements.cityNameBlock.element.appendChild(currentThis.HTMLElements.cityInput.element)
    } else if(!eTargetClassList.includes('city-name-input')){
      console.log('else');
      if(document.querySelector('.city-name-input')) {
        currentThis.HTMLElements.cityNameBlock.element.innerHTML = '';
        currentThis.HTMLElements.cityNameDiv.element.innerHTML = localStorage.getItem('city') || 'Minsk';
        currentThis.HTMLElements.cityNameBlock.element.appendChild(currentThis.HTMLElements.cityNameDiv.element);
      }
    }
  }

  getWeather() {
    this.getValue(this._url).then((response) => {
      if (response.isOk) {
        this.HTMLElements.errorBlock = "";
        for(const schemaChunk in this._responseSchema){
          const element = document.querySelector(`${this.HTMLElements[schemaChunk].selector}`);
          if(schemaChunk === 'iconPath') {
            this._iconTemplate = `${this._urlToIcon + response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]][this._responseSchema[schemaChunk][2]]}.png`;
            console.log(this._iconTemplate);
            element.src = this._iconTemplate;
            element.alt = response.json.weather[0].description;
          } else if(schemaChunk === "temperature" || schemaChunk === "windSpeed" || schemaChunk === "humidity") {
            element.innerHTML = Math.round(response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]]);
          } else {
            element.textContent = response.json[this._responseSchema[schemaChunk][0]][this._responseSchema[schemaChunk][1]][this._responseSchema[schemaChunk][2]];
          }
        }
      } else {
        this.HTMLElements.errorBlock = "Error! this city was not found. Try another. \n"
            + "Ошибка! Город не найден. Попробуйте другой город";
      }
    });
  }

  inputListener(event, currentThis){
    console.log(currentThis.HTMLElements.cityInput.element.value);
    currentThis.city = currentThis.HTMLElements.cityInput.element.value;
    this.getWeather();
  }
}
