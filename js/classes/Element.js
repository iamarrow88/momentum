export default class Element {
  constructor(tag) {
    this._tag = tag;
    this.element = null;
  }

  createHTMLElement(){
    let element = document.createElement(this._tag);
    this.element = element;
    return element;
  }

  setClass(classes){
    let classesLine;
    if(Array.isArray(classes)){
      classesLine = classes.join(', ');
    } else {
      classesLine = classes;
    }
    this.element.classList.add(classesLine);
  }

  setAttributes(attributePairs){
    attributePairs.forEach(attributePair => {
      const key = Object.keys(attributePair)[0];
      if(key.split('-').includes('data')){
        const datasetName = this.composeDatasetName(key);
        this.element.dataset[datasetName] = attr[key];
      } else {
        this.element.setAttribute(key, attr[key]);
      }
    })
  }

  insertElement(parentElement, childElement){
    parentElement.append(childElement);
  }

  composeDatasetName(dataValue){
    const datasetName = dataValue.split('-').slice(1);
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

  addListener(trigger, selector, insideHandlers){
    this.element.addEventListener(trigger, (e) => {
      if(e.target.matches(selector)){
        insideHandlers[0]();
      } else {
        insideHandlers[1]();
      }
    })
  }
}