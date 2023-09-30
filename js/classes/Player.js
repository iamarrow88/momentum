import Base from './base/Base.js';
import sprite from "../../assets/svg/sprite.svg";

export default class Player extends Base {
  constructor(lang, name, city, playerOptions, HTMLElements) {
    super(lang, name, city, HTMLElements);
    this.tracksMap = playerOptions.tracksMap;
    this._volume = playerOptions.volume;
    this._prevPlayedTrackID = playerOptions.prevPlayedTrackID;
    this._nextPlayedTrackID = playerOptions.nextPlayedTrackID;
    this._currentTrackID = playerOptions.currentTrackID;
    this.pathToSVG = playerOptions.pathToSVG;
    this.buttonsToToggle = playerOptions.buttonsToToggle;
    this._numberOfTracks = null;
  }


  setUp() {
    this.setPreviousTrackID = this._currentTrackID;
    this.setNextTrackID = this._currentTrackID;
    this.setNumberOfTracks(this.tracksMap);
    this.functionsDistribution[this.HTMLElements.animationBulbs.selector] = this.playAnimationListener;
  }

  startPlayer() {
    this.setUp();
    this.createPlayer();
    this.searchHTMLElements();

    this.HTMLElements.background.element.addEventListener('click', this.allEventsListener);
    //this.HTMLElements.playerBlock.addEventListener()
  }
  set setPreviousTrackID(currentTrackID) {
    let resultTrack;
    if (currentTrackID === null) {
      this.fields.currentTrackID = 0;
      localStorage.setItem('currentTrackID', '0');
      resultTrack = this._numberOfTracks - 1;
    } else {
      const prev = currentTrackID - 1;
      if (prev < 0) {
        resultTrack = this._numberOfTracks - 1;
      } else if (prev > this._numberOfTracks - 1) {
        resultTrack = 0;
      } else {
        resultTrack = prev;
      }
    }
    this._prevPlayedTrackID = resultTrack;
    localStorage.setItem('prevPlayedTrackID', resultTrack);
    return resultTrack;
  }

  set setNextTrackID(currentTrackID) {
    let resultTrack;
    if (currentTrackID === null) {
      this.fields.currentTrackID = 0;
      localStorage.setItem('currentTrackID', '0');
      resultTrack = this.fields.currentTrackID + 1;
    } else {
      const next = currentTrackID + 1;
      if (next > this._numberOfTracks - 1) {
        resultTrack = 0;
      } else if (next < 0) {
        resultTrack = this._numberOfTracks - 1;
      } else {
        resultTrack = next;
      }
    }
    this._nextPlayedTrackID = resultTrack;
    localStorage.setItem('nextPlayedTrack', resultTrack);
    return resultTrack;
  }

  set setCurrentTrackID(newTrackID){
    if(newTrackID >= 0 && newTrackID < this._numberOfTracks){
      this._currentTrackID = newTrackID;
    } else {
      throw new Error(`Ошибка! ID текущего трека не может быть более ${this._numberOfTracks - 1} и менее 0`)
    }
  }

  setNumberOfTracks(tracksMap) {
    this._numberOfTracks = Object.keys(tracksMap).length;
    return this._numberOfTracks;
  }

  getPrevPlayedTrackID() {
    return this._prevPlayedTrackID;
  }

  getNextPlayedTrackID() {
    return this._nextPlayedTrackID;
  }

  getCurrentTrackID() {
    return this._currentTrackID;
  }

  getNumberOfTracks() {
    return this._numberOfTracks;
  }
  createPlayer() {
    const playerWrapper = this.HTMLElements.playerBlock.element = document.querySelector('.player');

    playerWrapper.insertAdjacentHTML('afterbegin', '<audio class="player__audio" id="player__audio" preload="auto" autoplay></audio>\n' +
        '<div class="player-controls">\n' +
        '        <div class="player-controls__playback">\n' +
        '          <div class="player-icon svg-parent play-prev" data-button-name="play-prev">\n' +
        '            <svg class="svg-icon play-prev" data-button-name="play-prev">\n' +
        `              <use class="use-play-prev play-prev" data-button-name="play-prev" xlink:href="${sprite}#play-prev"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="player-icon svg-parent play" data-button-name="play">\n' +
        '            <svg class="svg-icon play" data-button-name="play">\n' +
        `              <use class="use-play play" data-button-name="play" xlink:href="${sprite}#play"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="player-icon svg-parent play-next" data-button-name="play-next">\n' +
        '            <svg class="svg-icon play-next" data-button-name="play-next">\n' +
        `              <use class="use-play-next play-next" data-button-name="play-next" xlink:href="${sprite}#play-next"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="player-controls__volume svg-parent volume" data-button-name="volume">\n' +
        '          <svg class="svg-icon volume" data-button-name="volume">\n' +
        `              <use class="use-volume volume" data-button-name="volume" xlink:href="${sprite}#volume"></use>\n` +
        '          </svg>\n' +
        '<div class="volume-bar__wrapper">\n' +
        '              <input class="volume-bar__range" type="range" min="0" max="100" step="1" value="0">' +
        '</div>\n' +
        '            </div>' +
        '        </div>\n' +
        '      </div>');

    const playlist = this.createElement('div', 'playlist', playerWrapper);
    const playListWrapper = this.createElement('ul', 'playlist__wrapper', playlist);

    for (let i = 0; i < this._numberOfTracks; i++) {
      playListWrapper.insertAdjacentHTML('beforeend', '<li class="song">\n' +
          '<div class="song__content">\n' +
          '<div class="song__sphere"></div>\n' +
          `<div class="song__title" data-songId="${i}">${this.tracksMap[i].author} - ${this.tracksMap[i].title}</div>\n` +
          `<svg class="icon song-icon track${i}-play track-play" data-songbtn="${i}"data-button-name="play-${i}" >\n` +
          `<use class="use-track${i}-play track${i}-play track-play" data-button-name="play-${i}" xlink:href="${sprite}#play"></use>\n` +
          `</svg>\n` +
          `</div>\n` +
          '</li>\n');
    }
  }
  playAnimationListener(e){
    this.HTMLElements.animationBulbs.element.forEach(bulb => bulb.classList.remove('isPlaying'));
    e.target.classList.toggle('isPlaying');
  }
  playerToggleButtonListener(e){
    let elementDataset = e.target.dataset;
    if(this.buttonsToToggle.includes(elementDataset.buttonName)){
      this.changeElementSvg(document.querySelector(`use[data-button-name=${elementDataset.buttonName}]`), this.pathToSVG+this.buttonsToToggle[elementDataset.buttonName], `use-${elementDataset.buttonName}`, `use-${this.buttonsToToggle[elementClass]}`);
      const allElementsWithThisData = document.querySelectorAll(`[data-button-name=${elementDataset.buttonName}]`);
      allElementsWithThisData.forEach(element => {
        element.dataset.buttonName = this.buttonsToToggle[elementDataset.buttonName];
      })
    }


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
  }
}