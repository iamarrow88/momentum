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
  createDatasetName(dataAttribute){
    const datasetName = dataAttribute.split('-').slice(1);
    let result = datasetName[0];
    if(datasetName.length > 1){
      for(let i = 1; i < datasetName.length; i++){
        let chunk = datasetName[i].split('');
        chunk[0] = chunk[0].toUpperCase();
        chunk = chunk.join('');
        result += chunk;
      }
    }
    return result;
  }

  createElement(tag, className, parentElement, attributes) {
    const element = document.createElement(tag);
    if(className) element.classList.add(className);
    if(parentElement) parentElement.append(element);
    if(attributes){
      attributes.forEach( attr => {
        const key = Object.keys(attr)[0];
        if(key.split('-').includes('data')){
          const datasetName = this.createDatasetName(key);
          element.dataset[datasetName] = attr[key];
        } else {
          element.setAttribute(key, attr[key]);
        }
      })
    }
    return element;
  }
}
