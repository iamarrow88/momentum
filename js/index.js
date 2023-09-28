import '../assets/scss/fonts.scss';
import '../assets/scss/main.scss';

import AppData from "./data/appData.js";
import App from "./classes/App.js";
import basicActions from "./actions/commonFunctions.js";

import Player from './classes/Player.js';
import tracks from "./data/tracks.js";
import Weather from './classes/Weather.js';
import ClocksBackground from "./classes/Clocks&Background.js";
import weather from "./classes/Weather.js";
import Quotes from "./classes/Quotes.js";
import Settings from "./classes/Settings.js";
import ToDo from "./classes/ToDo.js";



const trackId = localStorage.getItem('trackId') || 1;
const volume = localStorage.getItem('volume') || 30;
const lang = localStorage.getItem('lang') || 'en';
const name = localStorage.getItem('name') || '';
const city = localStorage.getItem('city') || 'Minsk';
const weatherAPIKey = '1e86aeecc6661092d35f019637c03153';
const quotesUrl = '';
const quotesAPIKey = '';
const quotesArray = [];
const tasksArray = [];

const Application = new App(lang, name, city, null, null, ClocksBackground, AppData)
/*Application.startApp();*/
Application.setProperty = ['basicActions', basicActions];
Application.setProperty = ['Weather', Weather];
basicActions.setObjectProperties(Application, Weather);

Player.start(tracks, volume);
Weather.start(city, lang, weatherAPIKey);
ClocksBackground.start(lang, name);
Quotes.start(lang, quotesAPIKey, quotesUrl, quotesArray);
Settings.start(lang);
ToDo.start(lang, tasksArray);





/*Player.setPlayer();*/


