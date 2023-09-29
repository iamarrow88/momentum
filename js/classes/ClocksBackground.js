import Base from "./base/Base.js";

export default class ClocksBackground extends Base{
  constructor(lang, name,) {
    super(lang, name);
    this._locales = this.setLocales(this.lang);
  }

  setLocales(lang) {
    return this.translation[lang].locales;
  }
}