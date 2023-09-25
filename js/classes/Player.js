import basic from '../actions/commonFunctions.js';
import sprite from '../../assets/svg/sprite.svg';

const Player = {
  fields: {
    trackMap: {},
    volume: null,
    prevPlayedTrackID: null,
    nextPlayedTrackID: null,
    currentTrackID: null,
    numberOfTracks: Object.keys(this.trackMap).length,
  },

  setPreviousTrackID(currentTrackID){
    const prev = currentTrackID - 1;
    let resultTrack;
    if(prev < 0) {
      resultTrack = this.numberOfTracks - 1;
    } else if(prev > this.numberOfTracks - 1){
      resultTrack = 0;
    } else {
      resultTrack = prev
    }
    this.prevPlayedTrackID = resultTrack;
    localStorage.setItem('prevPlayedTrackID', resultTrack);
  },
  setNextTrackID(currentTrackID){ /* 0 1 2 3*/
    const next = currentTrackID + 1;
    let resultTrack;
    if(next > this.currentTrackID - 1){
       resultTrack = 0;
    } else if(next < 0) {
       resultTrack = this.numberOfTracks - 1;
    } else {
       resultTrack = next;
    }
    this.nextPlayedTrack = resultTrack;
    localStorage.setItem('nextPlayedTrack', resultTrack);
  },

  getPrevPlayedTrackID(){
    return this.prevPlayedTrackID;
  },

  getNextPlayedTrackID() {
    return this.nextPlayedTrackID;
  },
  setPlayer(){
    this.createPlayer();
    this.setPreviousTrackID = this.currentTrackID;
    this.setNextTrackID = this.currentTrackID;
  },

  createElement(tag, className, parentElement) {
    const element = document.createElement(tag);
    element.classList.add(className);
    parentElement.append(element);
    return element;
  },
  createPlayer(){
    const trackNumber = Object.keys(this.trackMap).length;
    const playerWrapper = document.querySelector('.player');
    playerWrapper.insertAdjacentHTML('afterbegin', '<audio class="player__audio" id="player__audio" preload="auto" autoplay></audio>\n' +
        '<div class="player-controls">\n' +
        '        <div class="player-controls__playback">\n' +
        '          <div class="play-prev player-icon svg-parent">\n' +
        '            <svg class="svg-icon">\n' +
        `              <use class="svg-use-play" xlink:href="${sprite}#play-prev"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play player-icon svg-parent">\n' +
        '            <svg class="svg-icon">\n' +
        `              <use class="svg-use-play" xlink:href="${sprite}#play"></use>\n` +
        '              <use class="svg-use-play" xlink:href="pause"></use>\n' +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play-next player-icon svg-parent">\n' +
        '            <svg class="svg-icon">\n' +
        `              <use class="svg-use-play" xlink:href="${sprite}#play-next"></use>\n` +
        '            </svg>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="player-controls__volume svg-parent">\n' +
        '          <svg class="svg-icon">\n' +
        `              <use class="svg-use-play" xlink:href="${sprite}#volume"></use>\n` +
        '          </svg>\n' +
        '<div class="volume-bar__wrapper">\n' +
        '              <div class="volume-bar__inner">' +
        '<div class="volume-bar__point"></div>' +
        '</div>\n' +
        '            </div>' +
        '        </div>\n' +
        '      </div>');

    const playlist = this.createElement('div', 'playlist', playerWrapper);
    const playListWrapper = this.createElement('ul', 'playlist__wrapper', playlist);

    for (let i = 0; i < trackNumber; i++) {
      playListWrapper.insertAdjacentHTML('beforeend', '<li class="song">\n' +
          '<div class="song__content">\n' +
          '<div class="song__sphere"></div>\n' +
          `<div class="song__title" data-songId="${i}">${this.trackMap[i].author} - ${this.trackMap[i].title}</div>\n` +
          `<svg class="icon song-icon" data-songbtn="${i}">\n` +
          `<use class="svg-use-track${i}-play icon" xlink:href="${sprite}#play"></use>\n` +
          `</svg>\n` +
          `</div>\n` +
          '</li>\n');
    }
    /*function changeSvg(svgUse, url){
      return svgUse.setAttribute('href', url);
    }*/

    const isPlayingMarkers = document.querySelectorAll('.song__sphere');
    playerWrapper.addEventListener('click', function(e) {
      /*function changeElementSvg(element, newUrl, oldClass, newClass) {
        basic.changeSvg(element, newUrl);
        element.classList.remove(oldClass);
        element.classList.add(newClass);
      }*/
      let elementClass;
      if([...e.target.classList].includes('icon')) {
        elementClass = e.target.firstElementChild.classList[0];
      } else {
        elementClass = e.target.classList[0];
      }

      if([...e.target.classList].includes('song__sphere')) {
        isPlayingMarkers.forEach(bulb => bulb.classList.remove('isPlaying'));
        e.target.classList.toggle('isPlaying');
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
  }
}

export default Player;