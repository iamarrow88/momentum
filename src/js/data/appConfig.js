import translation from "./translation/translation.js";
import tracks from "./tracks.js";
import svgPath from "./svgPath.js";
import quotes from "./quotes.js";
import localStorageService from "../services/localStorageService.js";
import sprite from '../../assets/svg/sprite.svg'

const appConfig = {
  HTMLElements: {
    background: {
      selector: ".body",
      element: null,
    },
    prevBG: {
      selector: ".prev-item",
      element: null,
    },
    mainBG: {
      selector: ".main-item",
      element: null,
    },
    nextBG: {
      selector: ".next-item",
      element: null,
    },
    carousel: {
      selector: ".carousel",
      element: null,
    },
    prev: {
      selector: ".slide-prev",
      element: null,
    },
    next: {
      selector: ".slide-next",
      element: null,
    },

    playerBlock: {
      selector: ".player",
      element: null,
    },
    audioTag: {
      selector: "#player__audio",
      element: null,
    },
    playPrev: {
      selector: "div[data-button-name='play-prev']",
      element: null,
    },
    playNext: {
      selector: "div[data-button-name='play-next']",
      element: null,
    },
    play: {
      selector: "div[data-button-name='play']",
      element: null,
    },
    pause: {
      selector: "div[data-button-name='pause']",
      element: null,
    },
    volumeIcon: {
      selector: ".player-controls__volume .use-icon",
      element: null,
    },
    volumeRange: {
      selector: "[data-button-name='range']",
      element: null,
    },
    playlist: {
      selector: ".playlist",
      element: null,
    },
    animationBulbs: {
      selector: ".song__sphere",
      element: null,
      isArray: true,
    },

    weatherBlock: {
      selector: ".weather",
      element: null,
    },
    cityNameBlock: {
      selector: ".city-name-block",
      element: null,
    },
    cityNameDiv: {
      selector: ".city-name__div",
      element: null,
    },
    cityInput: {
      selector: ".city-name__input",
      element: null,
    },
    errorBlock: {
      selector: ".weather__error-block",
      element: null,
    },
    iconPath: {
      selector: ".weather-icon",
      element: null,
    },
    temperatureBlock: {
      selector: ".temperature",
      element: null,
    },
    temperature: {
      selector: ".temperature__number",
      element: null,
    },
    description: {
      selector: ".weather-description",
      element: null,
    },
    windBlock: {
      selector: ".wind",
      element: null,
    },
    windSpeed: {
      selector: ".wind__speedNumber",
      element: null,
    },
    humidityBlock: {
      selector: ".humidity",
      element: null,
    },
    humidity: {
      selector: ".humidity__number",
      element: null,
    },


    time: {
      selector: ".time",
      element: null,
    },
    date: {
      selector: ".date",
      element: null,
    },
    greetsBlock: {
      selector: ".greeting-container",
      element: null,
    },
    greeting: {
      selector: ".greeting",
      element: null,
    },
    nameBox: {
      selector: ".name__box",
      element: null,
    },
    nameDiv: {
      selector: ".name__div",
      element: null,
    },
    nameInput: {
      selector: ".name__input",
      element: null,
    },


    ToDoInputWrapper: {
      selector: ".to-do__header",
      element: null,
    },
    ToDoInput: {
      selector: ".to-do__input",
      element: null,
    },
    tasksList: {
      selector: ".to-do__task-list",
      element: null,
    },

    quote: {
      selector: ".quote__quote",
      element: null,
    },
    quoteAuthor: {
      selector: ".quote__author",
      element: null,
    },
    settingsBlock: {
      selector: ".footer__settings",
      element: null,
    },
  },
  translation,
  blocks: [
    "Player",
    "Weather",
    "Clocks",
    "Date",
    "Greets",
    "ToDo",
    "Quotes",
    "Settings",
    "Background",
  ],

  player: {
    tracksMap: tracks, // [{string: number, string: string, string: string}]
    src: ["./", ".mp3"],
    volume: +localStorageService.getItemFromLocalStorage("volume") || 30, // number 0 - 100
    isMuted: +localStorageService.getItemFromLocalStorage('isMuted') || false,
    currentTrackID: +localStorageService.getItemFromLocalStorage("currentTrackID") || 1, // number
    /*pathToSVGIcon: "./assets/svg/sprite.svg#",*/ // string
    pathToSVGIcon: sprite +"#", // string
    svgPathEndpoints: svgPath, // {string: string}
    buttonsToToggle: {
      play: "pause",
      pause: "play",
      volume: "mute",
      mute: "volume",
    }, // {string: string}
    SVGClassButtons: ["play", "pause", "play-prev", "play-next", "volume"], // [number]
  },
  weather: {
    responseSchema: {
      iconPath: ["weather", "0", "icon"],
      description: ["weather", "0", "description"],
      temperature: ["main", "temp"],
      humidity: ["main", "humidity"],
      windSpeed: ["wind", "speed"],
    },
    APIKey: "1e86aeecc6661092d35f019637c03153",
    urlToIcon: "https://openweathermap.org/img/wn/",
    blocksToHide: [
      "iconPath",
      "temperatureBlock",
      "description",
      "windBlock",
      "humidityBlock",
    ],
  },
  clocks: {
    isAPISource: localStorageService.getItemFromLocalStorage('isSourceAPI_bg'),
    timeOfADayBorders: {
      morning: {
        start: 5,
        end: 11,
      },
      afternoon: {
        start: 12,
        end: 16,
      },
      evening: {
        start: 17,
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
    dateOptions: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  },
  quotes: {
    /*url: "https://type.fit/api/quotes",*/
    url: "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=",
    APIKey: "",
    quotesArray: quotes,
    source: localStorageService.getItemFromLocalStorage('isSourceAPI_q') || 'project'
  },
  toDo: {
    tasksArray: [
      {
        taskValue: "Something",
        done: false,
        id: 0,
      },
      {
        taskValue: "To",
        done: false,
        id: 1,
      },
      {
        taskValue: "Do",
        done: false,
        id: 2,
      },
    ], // []
  },
};
export default appConfig;
