import Base from "./base/Base.js";
import sprite from "../../assets/svg/sprite.svg";
import localStorageService from "../services/localStorageService.js";
/*import sprite from "src/assets/svg/sprite.svg";*/

export default class Player extends Base {
  constructor(lang, name, city, HTMLElements, playerOptions) {
    super(lang, name, HTMLElements, city);
    this._volumeLevel = playerOptions.volume;
    this._isMuted = playerOptions.isMuted; /*todo*/
    this._prevPlayedTrackID = null;
    this._nextPlayedTrackID = null;
    this._currentTrackID = playerOptions.currentTrackID;
    this.pathToSVG = playerOptions.pathToSVGIcon;
    this.buttonsToToggle = playerOptions.buttonsToToggle;
    this._numberOfTracks = null;
    this._srcPath = playerOptions.src;
    this.tracksMap = playerOptions.tracksMap;
    this._refreshProgressBarProcessID = null;
    this._isPlaying = false;
    this._songButtons = [];
    this._isFirstClick = true;
    this._savedPlayedTrackID = null;
  }

  playerClicksHandler(event, playerObject) {
    const elementDataset = event.target.dataset;
    if (elementDataset.buttonName === "playManagement") {
      this.setPlayPause(this._currentTrackID, !this._isPlaying);
    } else if (elementDataset.buttonName === "play-prev") {
      this.refreshTrackData(this.findPrevTrackID(this._currentTrackID));
      this.setSongTitleToProgressBar(this._currentTrackID);
      this.setSrcToAudioTag(this._currentTrackID);
      if (!this._isPlaying) {
        this.HTMLElements.audioTag.element.pause();
      } else {
        this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);
      }
    } else if (elementDataset.buttonName === "play-next") {
      this.refreshTrackData(this.findNextTrackID(this._currentTrackID));
      this.setSongTitleToProgressBar(this._currentTrackID);
      this.setSrcToAudioTag(this._currentTrackID);
      if (!this._isPlaying) {
        this.HTMLElements.audioTag.element.pause();
      } else {
        this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);
      }
    } else if (elementDataset.buttonName === "volume") {
      this.setMuted(!this._isMuted);
      if (this._isMuted) {
        this.setVolumeToAudioTag(0);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "mute",
          "unmute",
          "mute",
        );
      } else {
        this.setVolumeToAudioTag(this._volumeLevel);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "sound-speaker",
          "mute",
          "unmute",
        );
      }
    } else if (event.target.closest(".song__content")) {
      this.setCurrentTrackID = +elementDataset.songId;
      this.setPreviousTrackID = this.findPrevTrackID(this.getCurrentTrackID());
      this.setNextTrackID = this.findNextTrackID(this.getCurrentTrackID());
      console.log("this._isFirstClick " + this._isFirstClick);
      if (this._isFirstClick) {
        this._isFirstClick = !this._isFirstClick;
        this._isPlaying = true;
      }
      if (
        this._isPlaying &&
        this.getCurrentTrackID() !== +elementDataset.songId
      ) {
        this._isPlaying = false;
      }

      this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);

      /*
       * 1. установить текущим треком выбранный
       * 2. запустить console.log('play');*/
    } else {
      console.log('unknown dataset');
    }
  }

  shouldPlay(buttonName) {
    if (this._savedPlayedTrackID !== this._currentTrackID) {
      if (this._isPlaying) {
        switch (buttonName) {
          case "playManagement": {
            console.log("поставить на паузу");
            break;
          }

          case "play-prev": {
            console.log("пусть играет дальше");
            break;
          }

          case "play-next": {
            console.log("пусть играет дальше");
            break;
          }

          case "song__content": {
            console.log("пусть играет дальше");
            break;
          }
        }
      } else {
        switch (buttonName) {
          case "playManagement": {
            console.log("запустить, чтобы играло");
            break;
          }

          case "play-prev": {
            console.log("пусть остается в паузе");
            break;
          }

          case "play-next": {
            console.log("пусть остается в паузе");
            break;
          }

          case "song__content": {
            console.log("запустить, чтобы играло");
            break;
          }
        }
      }
    } else {
      if (this._isPlaying) {
        switch (buttonName) {
          case "playManagement": {
            console.log("поставить на паузу");
            break;
          }

          case "song__content": {
            console.log("поставить на паузу");
            break;
          }
        }
      } else {
        switch (buttonName) {
          case "playManagement": {
            console.log("запустить, чтобы играло");
            break;
          }

          case "song__content": {
            console.log("запустить, чтобы играло");
            break;
          }
        }
      }
    }
  }

  setUp() {
    this.setNumberOfTracks(this.tracksMap);
    this.refreshTrackData(this._currentTrackID);
  }

  synchronizeVolumeLevelDisplay(){
    this.HTMLElements.volumeRange.element.value = this._volumeLevel;
  }

  toggleMuteIcon(){
    if (+this._volumeLevel !== 0) {
      this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "sound-speaker",
          "mute",
          "unmute",
      );
    } else {
      this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "mute",
          "unmute",
          "mute",
      );
    }
  }

  startPlayer() {
    this.setUp();
    this.createPlayer();
    this.searchHTMLElements();
    this.setSongTitleToProgressBar(this._currentTrackID);
    this.synchronizeVolumeLevelDisplay();
    this.toggleMuteIcon();
    this.checkAudioTag();
    this.HTMLElements.audioTag.element.addEventListener("ended", (e) => {
      this.endTrackListener();
    });
    this.setSrcToAudioTag(this.getCurrentTrackID());
    this.setVolumeToAudioTag(this._volumeLevel);
    this.HTMLElements.audioTag.element.pause();
  }

  changeHandler(e, options) {
    if ([...e.target.classList].includes("volume-bar__range")) {
      this._volumeLevel = +e.target.value;
      if (this._volumeLevel === 0) {
        this.setMuted(true);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "mute",
          "unmute",
          "mute",
        );
      } else {
        this.setMuted(false);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "sound-speaker",
          "mute",
          "unmute",
        );
      }
      this.setVolumeToAudioTag(this._volumeLevel);
      /*
       * 1. если звук включен, уменьшить/уввеличить звук
       * 2. записать новое значение в приложение
       * 3. записать новое значение в локал сторадж
       * */
    }
  }

  endTrackListener() {
    this.setCurrentTrackID = this.findNextTrackID(this._currentTrackID);
    this._isPlaying = true;
    this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);
  }

  setVolumeToAudioTag(newVolumeValue) {
    this.HTMLElements.audioTag.element.volume = newVolumeValue / 100;
  }

  setMuted(newValue){
    this._isMuted = newValue;
    localStorageService.setItemToLocalStorage('isMuted', newValue);
  }

  findPrevTrackID(currentTrackID) {
    let resultTrack;
    const prev = currentTrackID - 1;
    if (prev < 0) {
      resultTrack = this._numberOfTracks - 1;
    } else if (prev > this._numberOfTracks - 1) {
      resultTrack = 0;
    } else {
      resultTrack = prev;
    }
    return +resultTrack;
  }

  set setPreviousTrackID(trackID) {
    this._prevPlayedTrackID = +trackID;
    return this._prevPlayedTrackID;
  }

  findNextTrackID(currentTrackID) {
    let resultTrack;
    const next = currentTrackID + 1;
    if (next > this._numberOfTracks - 1) {
      resultTrack = 0;
    } else if (next < 0) {
      resultTrack = this._numberOfTracks - 1;
    } else {
      resultTrack = next;
    }
    return +resultTrack;
  }

  set setNextTrackID(trackID) {
    this._nextPlayedTrackID = +trackID;
    return this._nextPlayedTrackID;
  }

  set setCurrentTrackID(newTrackID) {
    if (newTrackID >= 0 && newTrackID < this._numberOfTracks) {
      this._currentTrackID = newTrackID;
      localStorageService.setItemToLocalStorage('currentTrackID', this._currentTrackID);
    } else {
      throw new Error(
        `Ошибка! ID текущего трека не может быть более ${
          this._numberOfTracks - 1
        } и менее 0`,
      );
    }
  }

  setNumberOfTracks(tracksMap) {
    this._numberOfTracks = tracksMap.length;
    return this._numberOfTracks;
  }

  refreshTrackData(trackID){
    this.setCurrentTrackID = trackID;
    this.setNextTrackID = this.findNextTrackID(trackID);
    this.setPreviousTrackID = this.findPrevTrackID(trackID);
    localStorageService.setItemToLocalStorage('currentTrackID', trackID);

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

  checkAudioTag() {
    if (!this.HTMLElements.audioTag || !this.HTMLElements.audioTag.element) {
      this.HTMLElements.audioTag = {
        element: document.querySelector(".player__audio"),
        selector: ".player__audio",
      };
    }
  }

  setSrcToAudioTag(trackID) {
    this.HTMLElements.audioTag.element.src =
      this._srcPath[0] + trackID + this._srcPath[1];
  }

  createPlayer() {
    const playerWrapper = (this.HTMLElements.playerBlock.element =
      document.querySelector(".player"));
    playerWrapper.innerHTML = '';
    playerWrapper.insertAdjacentHTML("afterbegin",
        `
              <audio class="player__audio" id="player__audio" preload="auto"></audio>
              <div class="player__header">
                <div class="player-controls">
                  <div class="player-controls__playback">
                    <div class="player-icon svg-parent" data-button-name="play-prev">
                      <svg class="svg-icon" data-button-name="play-prev">
                        <use class="use-icon" data-button-name="play-prev"
                             xlink:href="${sprite}#play-prev"></use>
                      </svg>
                    </div>
                    <div class="player-icon svg-parent" data-button-name="playManagement">
                      <svg class="svg-icon" data-button-name="playManagement">
                        <use class="use-icon" data-button-name="playManagement" xlink:href="${sprite}#play"></use>
                      </svg>
                    </div>
                    <div class="player-icon svg-parent" data-button-name="play-next">
                      <svg class="svg-icon" data-button-name="play-next">
                        <use class="use-icon" data-button-name="play-next"
                             xlink:href="${sprite}#play-next"></use>
                      </svg>
                    </div>
                  </div>
                  <div class="player-controls__volume svg-parent" data-button-name="volume">
                    <svg class="svg-icon" data-button-name="volume">
                      <use class="use-icon" data-button-name="volume" xlink:href="${sprite}#sound-speaker"></use>
                    </svg>
                    <div class="volume-bar__wrapper">
                      <input class="volume-bar__range" type="range" min="0" max="100" step="1" value="0" data-button-name="range"></div>
                  </div>
                </div>
                
                <div class="player__progress progress visible">
                  <div class="progress__title">Song TITLE</div>
                  <div class="progress__bar">
                    <div class="progress__start"></div>
                    <div class="progress__end">
                    </div>
                  </div>
                </div>
              </div>
      
              <!--<div class="playlist">
                <ul class="playlist__wrapper">
                </ul>
              </div>-->
            `
    );
    const playlist = this.createElement("div", "playlist", playerWrapper);
    const playListWrapper = this.createElement(
        "ul",
        "playlist__wrapper",
        playlist,
    );



    for (let i = 0; i < this._numberOfTracks; i++) {
      playListWrapper.insertAdjacentHTML(
        "beforeend",
        `
            <li class="song">
              <div class="song__content" data-song-id=\"${i}\" data-button-name="song-content">
                <div class="song__sphere" data-song-id=\"${i}\"></div>
                <div class="song__title" data-song-id=\"${i}\" data-button-name="song-content">${this.tracksMap[i].author} - ${this.tracksMap[i].title}</div>
                <svg class="svg-icon" data-song-id=\"${i}\" data-button-name="song-content">
                  <use class="use-icon" data-song-id=\"${i}\" data-button-name="song-content"
                       xlink:href="${sprite}#play"></use>
                </svg>
              </div>
            </li>
            `
      );
    }
  }

  playAndStopAnimationListener() {
    this.HTMLElements.animationBulbs.element.forEach((bulb) => {
      bulb.classList.remove("isPlaying");
      if (
        !this.HTMLElements.audioTag.element.paused &&
        +bulb.dataset.songId === this.getCurrentTrackID()
      ) {
        bulb.classList.add("isPlaying");
      }
    });
  }

  playerToggleButtonListener(trackId) {
    this._songButtons = document.querySelectorAll(".song__content .use-icon");
    this._songButtons.forEach((button) => {
      if ([...button.classList].includes("pause")) {
        this.changeElementSvg(
          button,
          this.pathToSVG + "play",
          this.buttonsToToggle["play"],
          "play",
        );
      }
    });
    /*сменить вид нужно на двух кнопкахЖ play и play для определенного трека. для поиска используем dataset. первая кнопка имеет
     * dataset data-button-name="playManagement"
     * вторая - data-button-name="play-${currentTrackID}"*/
    let buttonsToChangeDatasets = [];
    const newIconVision = this.HTMLElements.audioTag.element.paused
      ? "play"
      : "pause";

    const songDataset = `data-song-id="${trackId}"`; //dataset конкретной песни
    const buttonDataset = `data-button-name="playManagement"`; // datasset общая кнопка play

    const songButton = document.querySelector(`.use-icon[${songDataset}]`);
    buttonsToChangeDatasets.push(songButton);
    const playButton = document.querySelector(`.use-icon[${buttonDataset}]`);
    buttonsToChangeDatasets.push(playButton);

    buttonsToChangeDatasets.forEach((button) =>
      this.changeElementSvg(
        button,
        this.pathToSVG + newIconVision,
        this.buttonsToToggle[newIconVision],
        newIconVision,
      ),
    );
  }

  updateProgressBar(duration) {
    const progressBar = document.querySelector(".progress__bar");
    this._refreshProgressBarProcessID = setTimeout(() => {
      const currentTime = this.HTMLElements.audioTag.element.currentTime;

      if (duration) {
        if (currentTime <= duration) {
          const factSongDuration = Math.round((currentTime * 100) / duration);
          const songTail = 100 - factSongDuration;
          progressBar.style[
            "grid-template-columns"
          ] = `${factSongDuration}% ${songTail}%`;
          this.updateProgressBar(duration);
          if (currentTime === duration) {
            this.playerToggleButtonListener(this.getCurrentTrackID());
            clearTimeout(this._refreshProgressBarProcessID);
          }
        } else {
          this.playerToggleButtonListener(this.getCurrentTrackID());
          clearTimeout(this._refreshProgressBarProcessID);
        }
      }
    }, 1000);
  }

  setSongTitleToProgressBar(songID){
    document.querySelector('.progress__title').innerHTML = document.querySelector(`.song__title[data-song-id="${songID}"]`).innerHTML;
  }

  setPlayPause(selectedTrackId, shouldStartPlay) {
    this.setSrcToAudioTag(selectedTrackId);
    if (this._refreshProgressBarProcessID) {
      clearTimeout(this._refreshProgressBarProcessID);
    }
    this.setSongTitleToProgressBar(selectedTrackId);
    if (shouldStartPlay) {
      this._isPlaying = true;
      this.HTMLElements.audioTag.element.play();
      this.playerToggleButtonListener(selectedTrackId);
      this._isProgressBarShown = true;
      this.showProgressBar();
      let trackDuration;
      this.updateProgressBar(0);
      this.HTMLElements.audioTag.element.addEventListener(
        "loadedmetadata",
        () => {
          if (this._refreshProgressBarProcessID) {
            clearTimeout(this._refreshProgressBarProcessID);
          }
          trackDuration = this.HTMLElements.audioTag.element.duration;
          this.updateProgressBar(trackDuration);
        },
      );

      /* + сменить иконку на плей*/
      /* + проверить наличие прогресс бара. если его нет, то нужно создать и вставить на страницу*/
      /* + апустить анимацию шариков*/
    } else {
      this._isPlaying = false;
      this.HTMLElements.audioTag.element.pause();
      this.playerToggleButtonListener(selectedTrackId);
      this.updateProgressBar();
      /* + сменить иконку на пауза*/
      /* + остановить анимацию шариков*/
    }
    this.playAndStopAnimationListener();
    if (this._currentTrackID !== selectedTrackId) {
      this._currentTrackID = selectedTrackId;
      this.setLocalStorageProperty("currentTrackID", this._currentTrackID);
      this.setLocalStorageProperty(
        "nextTrackID",
        (this.setNextTrackID = this._currentTrackID + 1),
      );
      this.setLocalStorageProperty(
        "prevTrackID",
        (this.setPreviousTrackID = this._currentTrackID - 1),
      );

      /* + установить текущий трек в локал сторадж (сразу скопом с вледующим и предыдущим?)*/
      /* + найти и установить новые предыдущий и следующий треки*/
      /* + записать новый след и пред треки в локал сторадж*/
    }
  }

  showProgressBar() {
    const progressBarElement = document.querySelector(".progress");
    progressBarElement.classList.add("visible");
  }

  setLocalStorageProperty(key, value) {
    localStorage.setItem(key, value);
  }

  setVolumeChanges(newVolumeNumber) {
    this.checkAudioTag();
    this.HTMLElements.audioTag.element.volume = newVolumeNumber;
    this.setLocalStorageProperty("volume", newVolumeNumber);
  }
}
