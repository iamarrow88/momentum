import localStorageService from "../services/localStorageService.js";

export default class Settings {
  constructor(lang, translateMap) {
    this.lang = localStorageService.getItemFromLocalStorage('lang');
    this.translateMap = translateMap;
    this.blocksToTranslate = [];
  }

  startSettings(){
    this.setUp();
  }

  setUp(){
    this.blocksToTranslate = document.querySelectorAll('[data-translate]');
  }

  translatePage(lang){
    this.blocksToTranslate.forEach(block => {
      const translateMarker = block.dataset.translate;
      block.innerHTML = this.translateMap[lang][translateMarker];
    })
  }
}
