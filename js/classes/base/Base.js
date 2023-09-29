import translation from "../../data/translation/translation.js";

export default class Base {
  constructor(lang, name, city, HTMLElements, translation) {
    this.lang = lang;
    this.name = name;
    this.city = city;
    this.HTMLElements = HTMLElements;
    this.translation = translation;
  }

  changeSvg(svgUse, url) {
    return svgUse.setAttribute("href", url);
  }

  changeElementSvg(element, newUrl, oldClass, newClass) {
    this.changeSvg(element, newUrl);
    element.classList.remove(oldClass);
    element.classList.add(newClass);
    return element;
  }

  searchHTMLElements() {
    for (const className in this.HTMLElements) {
      this.HTMLElements[className] = document.querySelector(this.HTMLElements[className]);
    }
  }

  massAddEventListeners(HTMLElement, trigger, handler) {
    if (Array.isArray(HTMLElement)) {
      HTMLElement.forEach((element, index) => element.addEventListener(trigger[index], handler[index]));
    }
    return HTMLElement.addEventListener(trigger, handler);
  }

  createElement(tag, className, parentElement) {
    const element = document.createElement(tag);
    element.classList.add(className);
    parentElement.append(element);
    return element;
  }
}
