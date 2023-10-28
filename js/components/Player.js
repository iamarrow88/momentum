import Base from "./base/Base.js";
import sprite from "../../assets/svg/sprite.svg";

export default class Player extends Base {
  constructor(lang, name, city, HTMLElements, playerOptions) {
    super(lang, name, HTMLElements, city);
    this._volumeLevel = playerOptions.volume;
    this._isMuted = false;
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
      this._currentTrackID = this.findPrevTrackID(this._currentTrackID);
      this._prevPlayedTrackID = this.findPrevTrackID(this._currentTrackID);
      this._nextPlayedTrackID = this.findNextTrackID(this._currentTrackID);
      this.setSrcToAudioTag(this._currentTrackID);
      if (!this._isPlaying) {
        this.HTMLElements.audioTag.element.pause();
      } else {
        this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);
      }
      /*
      0. произвести расчет и установить текущий, предыдущий и следующие треки
      * 1. установить выбранным треком предыдущий
      * 2. запустить console.log('play');*/
    } else if (elementDataset.buttonName === "play-next") {
      this._prevPlayedTrackID = this._currentTrackID;
      this._currentTrackID = this.findNextTrackID(this._currentTrackID);
      this._nextPlayedTrackID = this.findNextTrackID(this._currentTrackID);
      this.setSrcToAudioTag(this._currentTrackID);
      if (!this._isPlaying) {
        this.HTMLElements.audioTag.element.pause();
      } else {
        this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);
      }
      /*
       * 1. установить выбранным треком следующий
       * 2. запустить console.log('play');*/
    } else if (elementDataset.buttonName === "volume") {
      this._isMuted = !this._isMuted;
      if (this._isMuted) {
        this.setVolume(0);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "mute",
          "unmute",
          "mute",
        );
      } else {
        this.setVolume(this._volumeLevel);
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "sound-speaker",
          "mute",
          "unmute",
        );
      }

      /*
       * 1. тоггл вкл/выкл звук в приложении
       * 2. сменить иконку
       * 3. убрать/включить звук
       * 4. записать статус в локал сторажд
       * если id трека меняется, то нужно его записывать в прев id
       * */
    } else if (event.target.closest(".song__content")) {
      this.setCurrentTrackID = +elementDataset.songid;
      this.setPreviousTrackID = this.findPrevTrackID(this.getCurrentTrackID());
      this.setNextTrackID = this.findNextTrackID(this.getCurrentTrackID());
      console.log("this._isFirstClick " + this._isFirstClick);
      if (this._isFirstClick) {
        this._isFirstClick = !this._isFirstClick;
        this._isPlaying = true;
      }
      if (
        this._isPlaying &&
        this.getCurrentTrackID() !== +elementDataset.songid
      ) {
        this._isPlaying = false;
      }

      this.setPlayPause(this.getCurrentTrackID(), this._isPlaying);

      /*
       * 1. установить текущим треком выбранный
       * 2. запустить console.log('play');*/
    } else if (elementDataset.buttonName === "track-play") {
      /*
       * 1. установить текущим треком выбранный
       * 2. запустить console.log('play');*/
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
    this.searchHTMLElements();
    this.setNumberOfTracks(this.tracksMap);
    this.setPreviousTrackID = this._currentTrackID;
    this.setNextTrackID = this._currentTrackID;
    this.HTMLElements.volumeRange = {
      selector: ".volume-bar__range",
      element: document.querySelector(
        `${this.HTMLElements.volumeRange.selector}`,
      ),
    };
    this.HTMLElements.volumeRange.element.value = this._volumeLevel;
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
    /*this.createPlayer();*/
    this.checkAudioTag();
    this.HTMLElements.audioTag.element.addEventListener("ended", (e) => {
      this.endTrackListener();
    });
    this.setSrcToAudioTag(this.getCurrentTrackID());
    this.setVolume(this._volumeLevel);
    this.HTMLElements.audioTag.element.pause();
    /*1. если текущего трека в локал сторадж нет, установить первый трек в качестве выбранного в приложении,
        в локал сторадж и в src*/
    this.searchHTMLElements();
  }

  changeHandler(e, options) {
    if ([...e.target.classList].includes("volume-bar__range")) {
      this._volumeLevel = +e.target.value;
      if (this._volumeLevel === 0) {
        this._isMuted = true;
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "mute",
          "unmute",
          "mute",
        );
      } else {
        this._isMuted = false;
        this.changeElementSvg(
          this.HTMLElements.volumeIcon.element,
          this.pathToSVG + "sound-speaker",
          "mute",
          "unmute",
        );
      }
      this.setVolume(this._volumeLevel);
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

  setVolume(newVolumeValue) {
    this.HTMLElements.audioTag.element.volume = newVolumeValue / 100;
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

    playerWrapper.insertAdjacentHTML(
      "afterbegin",
      '<audio class="player__audio" id="player__audio" preload="auto" autoplay></audio>\n' +
        '<div class="player-controls">\n' +
        '        <div class="player-controls__playback">\n' +
        '          <div class="player-icon svg-parent play-prev" data-button-name="play-prev">\n' +
        '            <svg class="svg-icon play-prev" data-button-name="play-prev">\n' +
        `              <use class="use-play-prev play-prev" data-button-name="play-prev" xlink:href="${sprite}#play-prev"></use>\n` +
        "            </svg>\n" +
        "          </div>\n" +
        '          <div class="player-icon svg-parent play" data-button-name="play">\n' +
        '            <svg class="svg-icon play" data-button-name="play">\n' +
        `              <use class="use-play play" data-button-name="play" xlink:href="${sprite}#play"></use>\n` +
        "            </svg>\n" +
        "          </div>\n" +
        '          <div class="player-icon svg-parent play-next" data-button-name="play-next">\n' +
        '            <svg class="svg-icon play-next" data-button-name="play-next">\n' +
        `              <use class="use-play-next play-next" data-button-name="play-next" xlink:href="${sprite}#play-next"></use>\n` +
        "            </svg>\n" +
        "          </div>\n" +
        "        </div>\n" +
        '        <div class="player-controls__volume svg-parent volume" data-button-name="volume">\n' +
        '          <svg class="svg-icon volume" data-button-name="volume">\n' +
        `              <use class="use-volume volume" data-button-name="volume" xlink:href="${sprite}#volume"></use>\n` +
        "          </svg>\n" +
        '<div class="volume-bar__wrapper">\n' +
        '              <input class="volume-bar__range" type="range" min="0" max="100" step="1" value="0">' +
        "</div>\n" +
        "            </div>" +
        "        </div>\n" +
        "      </div>",
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
        '<li class="song">\n' +
          `<div class=\"song__content\" data-songId=\"${i}\">\n` +
          '<div class="song__sphere"></div>\n' +
          `<div class="song__title" data-songId="${i}">${this.tracksMap[i].author} - ${this.tracksMap[i].title}</div>\n` +
          `<svg class="icon song-icon track${i}-play track-play" data-songbtn="${i}"data-button-name="play-${i}" >\n` +
          `<use class="use-track${i}-play track${i}-play track-play" data-songbtn="${i}" data-button-name="play-${i}" xlink:href="${sprite}#play"></use>\n` +
          "</svg>\n" +
          "</div>\n" +
          "</li>\n",
      );
    }
  }

  playAndStopAnimationListener() {
    this.HTMLElements.animationBulbs.element.forEach((bulb) => {
      bulb.classList.remove("isPlaying");
      if (
        !this.HTMLElements.audioTag.element.paused &&
        +bulb.dataset.songid === this.getCurrentTrackID()
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

    const songDataset = `data-songid="${trackId}"`; //dataset конкретной песни
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

  setPlayPause(selectedTrackId, shouldStartPlay) {
    this.setSrcToAudioTag(selectedTrackId);
    if (this._refreshProgressBarProcessID) {
      clearTimeout(this._refreshProgressBarProcessID);
    }
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
