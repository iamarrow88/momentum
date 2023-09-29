import "../assets/scss/fonts.scss";
import "../assets/scss/main.scss";

import appData from "./data/appData.js";
import App from "./classes/App.js";
import FinishApp from "./classes/base/FinishApp.js";

const lang = localStorage.getItem("lang") || "en";
const name = localStorage.getItem("name") || "";
const city = localStorage.getItem("city") || "Minsk";

const clocksOptions = {

}

const playerOptions = {
  tracksMap: appData.tracks,
  volume: localStorage.getItem("volume") || 30,
  prevPlayedTrackID: localStorage.getItem("prevPlayedTrackID") || null,
  nextPlayedTrackID: localStorage.getItem("nextPlayedTrackID") || null,
  currentTrackID: localStorage.getItem("currentTrackID") || 1,
  pathToSVG: "assets/svg/sprite.svg#",
  buttonsToToggle: { play: "pause", pause: "play", volume: "mute", mute: "volume" },
}



const weatherOptions = appData.weather;





const App2 = new FinishApp(lang, name, city, playerOptions);
App2.start();
console.log(App2);
const Application = new App(lang, name, city, null, null, ClocksBackground1, AppData);

const weatherAPIKey = "1e86aeecc6661092d35f019637c03153";
const quotesUrl = "";
const quotesAPIKey = "";
const quotesArray = [];
const tasksArray = [];
const locales = localStorage.getItem("locales") || Application.appData.translation[lang].locales;

/*Application.setProperty = ["basicActions", basicActions];
Application.setProperty = ["Weather1", Weather1];
basicActions.setObjectProperties(Application, Weather1);*/

/*Player1.start(tracks, volume);*/
Weather1.start(city, lang, weatherAPIKey);
ClocksBackground1.start(lang, name, locales, appData.dateOptions);
Quotes1.start(lang, quotesAPIKey, quotesUrl, quotesArray);
Settings1.start(lang);
ToD1o.start(lang, tasksArray);
