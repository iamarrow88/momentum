import translation from "./translation/translation.js";
import tracks from "./tracks.js";
import svgPath from "./svgPath.js";
import quotes from "./quotes.js";

const appData = {
  HTMLElements: {
    playerBlock: {
      selector: ".player",
      element: null,
    },
    audioTag: {
      selector: ".player__audio",
      element: null,
    },
    playPrev: {
      selector: "div.play-prev",
      element: null,
    },
    playNext: {
      selector: "div.play-next",
      element: null,
    },
    play: {
      selector: "div.play",
      element: null,
    },
    pause: {
      selector: "div.pause",
      element: null,
    },
    volumeIcon: {
      selector: "svg.volume",
      element: null,
    },
    volumeRange: {
      selector: ".volume-bar__range",
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
    time: {
      selector: ".time",
      element: null,
    },
    date: {
      selector: ".date",
      element: null,
    },
    greeting: {
      selector: ".greeting",
      element: null,
    },
    greetsBlock: {
      selector: ".greeting-container",
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
    trackPlay: {
      selector: ".track-play",
      element: null,
      isArray: true,
    },
    weatherBlock: {
      selector: ".weather",
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
    cityNameBlock: {
      selector: ".city-name-block",
      element: null,
    },
    cityNameDiv: {
      selector: ".city-name-div",
      element: null,
    },
    tasksList: {
      selector: ".to-do__task-list",
      element: null,
    },
    quote: {
      selector: '.quote__quote',
      element: null,
    },
    quoteAuthor: {
      selector: '.quote__author',
      element: null,
    },
    settingsBlock: {
      selector: '.footer__settings',
      element: null,
    }
  },
  translation,
  blocks: ["Player", "Weather", "Clocks", "Date", "Greets", "ToDo", "Quotes", "Settings", "Background"],

  player: {
    tracksMap: tracks, // [{string: number, string: string, string: string}]
    volume: +localStorage.getItem("volume") || 30, // number
    prevPlayedTrackID: +localStorage.getItem("prevPlayedTrackID") || null, // number | null
    nextPlayedTrackID: +localStorage.getItem("nextPlayedTrackID") || null, // number | null
    currentTrackID: +localStorage.getItem("currentTrackID") || 1, // number
    pathToSVGIcon: "assets/svg/sprite.svg#", // string
    svgPathEndpoints: svgPath, // {string: string}
    buttonsToToggle: {
      play: "pause", pause: "play", volume: "mute", mute: "volume",
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
    blocksToHide: ['iconPath', 'temperatureBlock', 'description', 'windBlock', 'humidityBlock']
  },
  clocks: {
    isAPISource: false,
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
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    },
  },
  quotes: {
    url: "https://type.fit/api/quotes",
    APIKey: "",
    quotesArray: quotes,
  },
  toDo: {
    tasksArray: [
      {
        taskValue: 'Something',
        done: false,
        id: 0
      },
      {
        taskValue: 'To',
        done: false,
        id: 1
      },
      {
        taskValue: 'Do',
        done: false,
        id: 2
      }
    ], // []
  },
};
export default appData;
