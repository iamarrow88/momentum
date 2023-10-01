import Player from "../Player.js";

export default class FinishApp extends Player{
  constructor(lang, name, city, playerOptions) {
    super(lang, name, city, playerOptions);
  }
  start() {
    this.startPlayer();
  }

/*  allEventsListener(e){
    let eTargetDataset = e.target.dataset; // содержит любой датасет, нужно выбирать необходимый
    let eTargetClassList = Array.from(e.target.classList);
    let eTargetClass;
    if(eTargetClassList.includes('icon')) {
      eTargetClass = e.target.firstElementChild.classList[0];
    } else {
      eTargetClass = e.target.classList[0];
    }

    if (eTargetClass === 'song__sphere') {
      this.playAnimationListener();
    }
  }*/
}