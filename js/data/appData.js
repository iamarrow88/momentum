import en from './translation/languages/en.js';
import ru from './translation/languages/ru.js';

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
  trackMap: [
    {
      id: 0,
      author: 'The Moth & The Flame',
      title: 'Simple',
      btn: null,
    },
    {
      id: 1,
      author: 'Coldplay',
      title: 'Paradise',
      btn: null,
    },
    {
      id: 2,
      author: 'Lord Huron',
      title: 'The Night We Met',
      btn: null,
    },
    {
      id: 3,
      author: 'Arcane Roots',
      title: 'Half the World',
      btn: null,
    },
  ],
  svgUrl: {
    "play": "assets/svg/sprite.svg#play",
    "pause": "assets/svg/sprite.svg#pause",
    "volume": "assets/svg/sprite.svg#volume",
    "mute": "assets/svg/sprite.svg#mute",
  },
  toggleButtons: ["play", "pause", "play-prev", "play-next", "volume", "mute"],
  DATE_OPTIONS: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  selectedLang: 'en',
  'translation': {},
  requirements: {
    lang: ['Player', 'Weather', 'Clocks', 'Date', 'Greets', 'ToDo', 'Quotes', 'Settings']
  }
}
appData.translation.eng = en;
appData.translation.ru = ru;
export default appData;