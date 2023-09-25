import '../assets/scss/fonts.scss';
import '../assets/scss/main.scss';
import AppData from "./data/appData.js";
import Clocks from "./classes/Clocks.js";
import basicActions from "./actions/commonFunctions.js";
import App from "./classes/App.js";
import Weather from './classes/Weather.js';
/*import Player from './classes/Player.js';*/



const trackId = localStorage.getItem('trackId') || 1;
const volume = localStorage.getItem('volume') || 30;
const lang = localStorage.getItem('lang') || 'en';
const name = localStorage.getItem('name') || '';
const city = localStorage.getItem('city') || 'Minsk';

const Application = new App(lang, name, city, null, null, Clocks, AppData)
/*Application.startApp();*/
Application.setProperty = ['basicActions', basicActions];
Application.setProperty = ['Weather', Weather];
basicActions.setObjectProperties(Application, Weather);
console.log(Application);
Weather.start();

/*basicActions.clocks.getDate(lang);*/



/*Player.setPlayer();*/


