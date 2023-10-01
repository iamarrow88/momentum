import "../assets/scss/fonts.scss";
import "../assets/scss/main.scss";

import appData from "./data/appData.js";
import Player from './classes/Player.js';
import ClocksBackground from "./classes/ClocksBackground.js";


const lang = localStorage.getItem("lang") || "en";
const name = localStorage.getItem("name") || "";
const city = localStorage.getItem("city") || "Minsk";

const clocksOptions = {
  dateOptions: appData.dateOptions,
  translation: appData.translation,
  dayMap: appData.clocks.dayMap,
  HTMLElements: appData.HTMLElements,
};

const playerOptions = {
  tracksMap: appData.tracks,
  volume: localStorage.getItem("volume") || 30,
  prevPlayedTrackID: localStorage.getItem("prevPlayedTrackID") || null,
  nextPlayedTrackID: localStorage.getItem("nextPlayedTrackID") || null,
  currentTrackID: localStorage.getItem("currentTrackID") || 1,
  pathToSVG: "assets/svg/sprite.svg#",
  buttonsToToggle: { play: "pause", pause: "play", volume: "mute", mute: "volume" },
};

const weatherOptions = appData.weather;

const quotesOptions = {
  quotesUrl: '',
  quotesAPIKey: '',
  quotesArray: []
};

const toDoOptions = {
  tasksArray: []
};

const player = new Player(lang, name, city, appData.HTMLElements, playerOptions);
player.startPlayer();
const background = new ClocksBackground(lang, name, clocksOptions);
background.startClocksBackground();

