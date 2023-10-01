export default class Base {
  constructor(lang, name, city,HTMLElements) {
    this.lang = lang;
    this.name = name;
    this.city = city;
    this.HTMLElements = HTMLElements;
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
      if(this.HTMLElements[className].isArray){
        this.HTMLElements[className].element = document.querySelectorAll(this.HTMLElements[className].selector);
      } else {
        this.HTMLElements[className].element = document.querySelector(this.HTMLElements[className].selector);
      }
    }
  }

  massAddEventListeners(HTMLElement, trigger, selector, handler) {
    if(selector) {
      if (Array.isArray(HTMLElement)) {
        HTMLElement.forEach((element, index) => element.addEventListener(trigger[index], e => {
          if (e.target.matches(selector)) handler[index](e);
        }));
      }
      HTMLElement.addEventListener(trigger, e => {
        if (e.target.matches(selector)) handler(e);
      });
    } else {
      if (Array.isArray(HTMLElement)) {
        HTMLElement.forEach((element, index) => element.addEventListener(trigger[index], e =>  handler[index](e)));
      }
      HTMLElement.addEventListener(trigger, e => handler(e));
    }

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

  /*allEventsListener(e, newThis){
    let eTargetDataset = e.target.dataset; // содержит любой датасет, нужно выбирать необходимый
    let eTargetClassList = Array.from(e.target.classList);
    console.log(eTargetClassList);
    let eTargetClass;
    if(eTargetClassList.includes('icon')) {
      eTargetClass = e.target.firstElementChild.classList[e.target.firstElementChild.classList.length - 1];
    } else {
      eTargetClass = e.target.classList[e.target.classList.length - 1];
    }

    if (eTargetClass === Base.HTMLElements.animationBulbs.selector) {
      if(this.functionsDistribution[this.HTMLElements.animationBulbs.selector]) this.functionsDistribution[this.HTMLElements.animationBulbs.selector](e);
      /!*this.playAnimationListener();*!/
    }
  }*/
}
