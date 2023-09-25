import basic from '../actions/commonFunctions.js';
import sprite from '../../assets/svg/sprite.svg';
import play from '../../assets/svg/play.svg';

/* !TODO
 *   html код плеера +
 *   стили страницы
 *   функция по замене иконок (плей и тп)
 *   функция начала и окончания воспроизведения
 *    функция переключения треков (след/предыдущий)
 *    функция переключения треков по клику на трек
 *    если song__title больше, чем определенное кол во знаков, то сократить
 *   на все, что нажимается, сделать курсор пойнтер
 *   все инпуты выровнять, чтобы нормально смотрелось (В т ч в адаптиве)
 *   перевод ошибки погоды при смене языка?
 * */

const Player = {
  fields: {
    trackMap: {},
    volume: null,
    prevPlayedTrack: null,
    nextPlayedTrack: null,
    currentTrackId: null,
    numberOfTracks: Object.keys(this.trackMap).length,
  },

  setPreviousTrackId(currentTrackId){
    const prev = currentTrackId - 1;
    if(prev < 0) {
      this.prevPlayedTrack = this.numberOfTracks - 1;
    } else if(prev > this.numberOfTracks - 1){
      this.prevPlayedTrack = 0;
    } else {
      this.prevPlayedTrack = prev;
    }
  },
  setNextTrackId(currentTrackId){ /* 0 1 2 3*/
    const next = currentTrackId + 1;
    if(next > this.currentTrackId - 1){
      this.nextPlayedTrack = 0;
    } else if(next < 0) {
      this.nextPlayedTrack = this.numberOfTracks - 1;
    } else {
      this.nextPlayedTrack = next;
    }
  },

  getPrevPlayedTrack(){
    return this.prevPlayedTrack;
  },

  getNextPlayedTrack() {
    return this.nextPlayedTrack;
  },
  setPlayer(){
    this.createPlayer();
    this.setPreviousTrackId = this.currentTrackId;
    this.setNextTrackId = this.currentTrackId;
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