import basic from '../actions/commonFunctions.js';
import sprite from '../../assets/svg/sprite.svg';

const Player = {
  fields: {
    trackMap: [],
    volume: null,
    prevPlayedTrackID: null,
    nextPlayedTrackID: null,
    currentTrackID: null,
    numberOfTracks: null,
    toggleButtons: {"play": "pause", "pause": "play", "volume": "mute", "mute": "volume"},
    pathToSVG:'assets/svg/sprite.svg#'
  },

  setPreviousTrackID(currentTrackID) {
    let resultTrack;
    if (currentTrackID === null) {
      this.fields.currentTrackID = 0;
      localStorage.setItem('currentTrackID', '0');
      resultTrack = this.numberOfTracks - 1;
    } else {
      const prev = currentTrackID - 1;
      if (prev < 0) {
        resultTrack = this.numberOfTracks - 1;
      } else if (prev > this.numberOfTracks - 1) {
        resultTrack = 0;
      } else {
        resultTrack = prev;
      }
    }
    this.prevPlayedTrackID = resultTrack;
    localStorage.setItem('prevPlayedTrackID', resultTrack);
    return resultTrack;
  },

  setNextTrackID(currentTrackID) {
    let resultTrack;
    if (currentTrackID === null) {
      this.fields.currentTrackID = 0;
      localStorage.setItem('currentTrackID', '0');
      resultTrack = this.fields.currentTrackID + 1;
    } else {
      const next = currentTrackID + 1;
      if (next > this.currentTrackID - 1) {
        resultTrack = 0;
      } else if (next < 0) {
        resultTrack = this.numberOfTracks - 1;
      } else {
        resultTrack = next;
      }
    }
    this.nextPlayedTrack = resultTrack;
    localStorage.setItem('nextPlayedTrack', resultTrack);
    return resultTrack;
  },

  setNumberOfTracks() {
    return Object.keys(this.fields.trackMap).length;
  },

  getPrevPlayedTrackID() {
    return this.prevPlayedTrackID;
  },

  getNextPlayedTrackID() {
    return this.nextPlayedTrackID;
  },

  getNumberOfTracks() {
    return this.numberOfTracks;
  },

  createPlayer() {
    const trackNumber = Object.keys(this.fields.trackMap).length;
    const playerWrapper = document.querySelector('.player');
    playerWrapper.insertAdjacentHTML('afterbegin', '<audio class="player__audio" id="player__audio" preload="auto" autoplay></audio>\n' +
        '<div class="player-controls">\n' +
        '        <div class="player-controls__playback">\n' +
        '          <div class="play-prev player-icon svg-parent"data-button-name="play-prev">\n' +
        '            <svg class="play-prev svg-icon"data-button-name="play-prev">\n' +
        `              <use class="play-prev use-play-prev" data-button-name="play-prev" xlink:href="${sprite}#play-prev"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play player-icon svg-parent"data-button-name="play">\n' +
        '            <svg class="play svg-icon"data-button-name="play">\n' +
        `              <use class="play use-play" data-button-name="play" xlink:href="${sprite}#play"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play-next player-icon svg-parent"data-button-name="play-next">\n' +
        '            <svg class="play-next svg-icon"data-button-name="play-next">\n' +
        `              <use class="play-next use-play-next" data-button-name="play-next" xlink:href="${sprite}#play-next"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="volume player-controls__volume svg-parent"data-button-name="volume">\n' +
        '          <svg class="volume svg-icon"data-button-name="volume">\n' +
        `              <use class="volume use-volume" data-button-name="volume" xlink:href="${sprite}#volume"></use>\n` +
        '          </svg>\n' +
        '<div class="volume-bar__wrapper">\n' +
        '              <input type="range" min="0" max="100" step="1" value="0">' +
        '</div>\n' +
        '            </div>' +
        '        </div>\n' +
        '      </div>');

    const playlist = basic.createElement('div', 'playlist', playerWrapper);
    const playListWrapper = basic.createElement('ul', 'playlist__wrapper', playlist);

    for (let i = 0; i < trackNumber; i++) {
      playListWrapper.insertAdjacentHTML('beforeend', '<li class="song">\n' +
          '<div class="song__content">\n' +
          '<div class="song__sphere"></div>\n' +
          `<div class="song__title" data-songId="${i}">${this.fields.trackMap[i].author} - ${this.fields.trackMap[i].title}</div>\n` +
          `<svg class="track${i}-play icon song-icon" data-songbtn="${i}"data-button-name="play-${i}" >\n` +
          `<use class="track${i}-play use-track${i}-play" data-button-name="play-${i}" xlink:href="${sprite}#play"></use>\n` +
          `</svg>\n` +
          `</div>\n` +
          '</li>\n');
    }

    const markersPlayingAnimation = document.querySelectorAll('.song__sphere');
    playerWrapper.addEventListener('click', function (e) {
      let elementClass;
      let elementDataset = e.target.dataset; // содержит любой датасет, нужно выбирать необходимый
      if ([...e.target.classList].includes('icon')) {
        elementClass = e.target.firstElementChild.classList[0];
      } else {
        elementClass = e.target.classList[0];
      }

      if (elementClass === 'song__sphere') {
        markersPlayingAnimation.forEach(bulb => bulb.classList.remove('isPlaying'));
        e.target.classList.toggle('isPlaying');
      }
      console.log(`объект в кнопочками для смены содержит: ${Object.keys(Player.fields.toggleButtons)}`);
      console.log(`elementClass - ${elementClass}`);
      console.log(`Его противоположность - ${Player.fields.toggleButtons[elementClass]}`);
      console.log(`кнопочкi - `);
      console.log(document.querySelectorAll(`[data-button-name=${elementClass}]`));
      if(Object.keys(Player.fields.toggleButtons).includes(elementDataset.buttonName)){
        basic.changeElementSvg(document.querySelector(`use[data-button-name=${elementDataset.buttonName}]`), Player.fields.pathToSVG+Player.fields.toggleButtons[elementDataset.buttonName], `use-${elementDataset.buttonName}`, `use-${Player.fields.toggleButtons[elementClass]}`);
        const allElementsWithThisData = document.querySelectorAll(`[data-button-name=${elementDataset.buttonName}]`);
        allElementsWithThisData.forEach(element => {
          element.dataset.buttonName = Player.fields.toggleButtons[elementDataset.buttonName];
        })
      }

      /*basic.changeElementSvg(elementClass, newUrl, oldClass, newClass)*/
      /*if(Object.key(svgUrl).includes(elementClass)){

      }*/
      /*console.log(e.target.classList);*/
      /*if([...e.target.classList.includes('svg-use-play')]) {
        changeSvg(e.target, 'assets/svg/sprite.svg#pause');
        e.target.classList.remove('svg-use-play');
        e.target.classList.add('svg-use-pause');
      } else if([...e.target.classList].includes('svg-use-pause')) {
        changeSvg(e.target, 'assets/svg/sprite.svg#play');
        e.target.classList.remove('svg-use-pause');
        e.target.classList.add('svg-use-play');
      } else if([...e.target.classList].includes('svg-use-volume')) {
        changeSvg(e.target, 'assets/svg/sprite.svg#mute');
        e.target.classList.remove('svg-use-volume');
        e.target.classList.add('svg-use-mute');
      } else if([...e.target.classList].includes('svg-use-mute')) {
        changeSvg(e.target, 'assets/svg/sprite.svg#volume');
        e.target.classList.remove('svg-use-mute');
        e.target.classList.add('svg-use-volume');
      }*/
    });
  },

  setUp() {
    this.setPreviousTrackID = this.fields.currentTrackID;
    this.setNextTrackID = this.fields.currentTrackID;
    this.setNumberOfTracks = this.fields.trackMap;
  },

  start(trackMap, volume) {
    this.fields.trackMap = trackMap;
    this.fields.volume = volume;
    this.setUp();
    this.createPlayer();
  }
}

export default Player;
