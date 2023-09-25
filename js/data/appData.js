import translation from "./translation/translation.js";
import tracks from './tracks.js';
import svgPath from './svgPath.js';
const appData = {
  HTMLElements: {
    'audio': 'player__audio',
    'controls-wrapper': 'player-controls',
    'playback-control-box': 'player-controls__play-wrapper',
    'volume-control-box': 'player-controls__mute',
    'slider-div-prev': 'slide-prev',
    'slider-div-next': 'slide-next',
    'time-block': 'time',
    'date-block': 'date',
    'greeting-line': 'greeting',
    'name-placeholder': 'name',
  },
  SVGClassButtons: ["play", "pause", "play-prev", "play-next", "volume"],
  blocks: ['Player', 'Weather', 'Clocks', 'Date', 'Greets', 'ToDo', 'Quotes', 'Settings', 'Background'],
  toggleButtons: ["play", "pause", "play-prev", "play-next", "volume", "mute"],
  DATE_OPTIONS: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  selectedLang: 'en',
  'translation': {},
  requirements: {
    lang: ['Player', 'Weather', 'Clocks', 'Date', 'Greets', 'ToDo', 'Quotes', 'Settings']
  }
}
appData.translation = translation;
export default appData;