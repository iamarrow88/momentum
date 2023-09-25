class App {
  date = new Date();
  constructor(lang, customerName, city, picturePathMap, quotesMap){
    this.lang = lang;
    this.customerName = customerName;
    this.city = city;
    this.picturePathMap = picturePathMap;
    this.quotesMap = quotesMap;
  }

  set setLang(newLang){
    this.lang = newLang;
  }

}
/* trackMap = [
{
"id" : number,
"title": string,
"author": string
}]
* */
class Player {
  buttons: ["play", "pause", "play-prev", "play-next", "volume"];
  constructor(trackMap, trackNumber, volume) {
    this.trackMap = trackMap;
    this.trackNumber = trackNumber;
    this.volume = volume;
  }

  createPlayer(){
    const trackNumber = Object.keys(this.trackMap).length;
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player');
    playerWrapper.insertAdjacentHTML('beforebegin', '<div class="player-controls">\n' +
        '        <div class="player-controls__play-wrapper">\n' +
        '          <div class="play-prev player-icon">\n' +
        '            <svg class="icon">\n' +
        '              <use xlink:href="assets/svg/sprite.svg#play-prev"></use>\n' +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play player-icon">\n' +
        '            <svg class="icon">\n' +
        '              <use xlink:href="assets/svg/sprite.svg#play"></use>\n' +
        '            </svg>\n' +
        '          </div>\n' +
        '          <div class="play-next player-icon">\n' +
        '            <svg class="icon">\n' +
        '              <use xlink:href="assets/svg/sprite.svg#play-next"></use>\n' +
        '            </svg>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="player-controls__mute">\n' +
        '          <svg class="icon">\n' +
        '            <use xlink:href="assets/svg/sprite.svg#volume"></use>\n' +
        '          </svg>\n' +
        '        </div>\n' +
        '      </div>');

    const playList = document.createElement('ul');
    playList.classList.add('play-list');
    for (let i = 0; i < trackNumber; i++) {
      playList.insertAdjacentHTML('beforebegin', `<li class="song">${this.trackMap[i].author} - ${this.trackMap[i].title}</li>`);
      playList.insertAdjacentHTML('beforebegin', `<div class="player-icon" data-songbtn="${i}"><svg class="icon"><use xlink:href="assets/svg/sprite.svg#play" class="icon"></use></svg></div>`);

    }
  }

}