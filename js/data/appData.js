import translation from "./translation/translation.js";
import tracks from "./tracks.js";
import svgPath from "./svgPath.js";

const appData = {
  HTMLElements: {
    playerBlock: '.player',
    audioTag: '.player__audio',
    playPrev: 'div.play-prev',
    playNext: 'div.play-next',
    play: 'div.play',
    pause: 'div.pause',
    volumeIcon: 'svg.volume',
    volumeRange: '.volume-bar__range',
    playlist: '.playlist',
    animationBulbs: '.song__sphere',
    time: ".time",
    date: ".date",
    greeting: ".greeting",
    name: ".name",
    prev: ".slide-prev",
    next: ".slide-next",
    background: ".body",
    errorBlock: ".weather__error-block",
    iconPath: ".weather-icon",
    temperature: ".temperature__number",
    description: ".weather-description",
    windSpeed: ".wind__speedNumber",
    humidity: ".humidity__number",
    cityNameBlock: ".city-name-block",
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
    APIKey: "",
    urlToIcon: "https://openweathermap.org/img/wn/",
  }


};
appData.translation = translation;
export default appData;
