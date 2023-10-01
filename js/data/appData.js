import translation from "./translation/translation.js";
import tracks from "./tracks.js";
import svgPath from "./svgPath.js";

const appData = {
  HTMLElements: {
    playerBlock: {
      selector: '.player',
      element: null
    },
    audioTag:{
      selector: '.player__audio',
      element: null
    },
    playPrev:{
      selector: 'div.play-prev',
      element: null
    },
    playNext:{
      selector: 'div.play-next',
      element: null
    },
    play:{
      selector: 'div.play',
      element: null
    },
    pause:{
      selector: 'div.pause',
      element: null
    },
    volumeIcon:{
      selector: 'svg.volume',
      element: null
    },
    volumeRange:{
      selector: '.volume-bar__range',
      element: null
    },
    playlist:{
      selector: '.playlist',
      element: null
    },
    animationBulbs:{
      selector: '.song__sphere',
      element: null,
      isArray: true
    },
    time:{
      selector: ".time",
      element: null
    },
    date:{
      selector: ".date",
      element: null
    },
    greeting:{
      selector: ".greeting",
      element: null
    },
    greetsBlock: {
      selector: ".greeting-container",
      element: null
    },
    name:{
      selector: ".name",
      element: null
    },
    prev:{
      selector: ".slide-prev",
      element: null
    },
    next:{
      selector: ".slide-next",
      element: null
    },
    trackPlay: {
      selector: ".track-play",
      element: null,
      isArray: true
    },
    background:{
      selector: ".body",
      element: null
    },
    errorBlock:{
      selector: ".weather__error-block",
      element: null
    },
    iconPath:{
      selector: ".weather-icon",
      element: null
    },
    temperature:{
      selector: ".temperature__number",
      element: null
    },
    description:{
      selector:".weather-description",
      element: null
    } ,
    windSpeed:{
      selector: ".wind__speedNumber",
      element: null
    },
    humidity:{
      selector: ".humidity__number",
      element: null
    },
    cityNameBlock:{
      selector: ".city-name-block",
      element: null
    },
  },
  blocks: ["Player", "Weather", "Clocks", "Date", "Greets", "ToDo", "Quotes", "Settings", "Background"],

  tracks: tracks,
  SVGClassButtons: ["play", "pause", "play-prev", "play-next", "volume"],
  svgPath: svgPath,

  dateOptions: {weekday: "long", year: "numeric", month: "long", day: "numeric"},
  translation: {},

  weather: {
    responseData: {
      iconPath: ["weather", "0", "icon"],
      description: ["weather", "0", "description"],
      temperature: ["main", "temp"],
      humidity: ["main", "humidity"],
      windSpeed: ["wind", "speed"],
    },
    APIKey: "1e86aeecc6661092d35f019637c03153",
    urlToIcon: "https://openweathermap.org/img/wn/",
  },
  clocks: {
    dayMap: {
      morning: {
        start: 5,
        end: 11,
      },
      afternoon: {
        start: 12,
        end: 17,
      },
      evening: {
        start: 18,
        end: 19,
      },
      night1: {
        start: 20,
        end: 23,
      },
      night2: {
        start: 0,
        end: 4,
      },
    },
  }


};
appData.translation = translation;
export default appData;
