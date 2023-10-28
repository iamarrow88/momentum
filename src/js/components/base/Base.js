export default class Base {
  constructor(lang, name, HTMLElements, city) {
    this.lang = lang;
    this.name = name;
    this.city = city;
    this.HTMLElements = HTMLElements;
  }

  setNewSVGPath(svgUse, url) {
    return svgUse.setAttribute("xlink:href", url);
  }

  changeElementSvg(element, newUrl, oldClass, newClass) {
    this.setNewSVGPath(element, newUrl);
    element.classList.remove(oldClass);
    element.classList.add(newClass);
    return element;
  }

  searchHTMLElements() {
    for (const className in this.HTMLElements) {
      if (this.HTMLElements[className].isArray) {
        this.HTMLElements[className].element = document.querySelectorAll(
          this.HTMLElements[className].selector,
        );
      } else {
        this.HTMLElements[className].element = document.querySelector(
          this.HTMLElements[className].selector,
        );
      }
    }
  }

  getRandomNumber(n) {
    return Math.floor(Math.random() * n + 1);
  }

  createDatasetName(dataAttribute) {
    const datasetName = dataAttribute.split("-").slice(1);
    let result = datasetName[0];
    if (datasetName.length > 1) {
      for (let i = 1; i < datasetName.length; i++) {
        let chunk = datasetName[i].split("");
        chunk[0] = chunk[0].toUpperCase();
        chunk = chunk.join("");
        result += chunk;
      }
    }
    return result;
  }

  async getData(url) {
    const response = await fetch(`${url}`);
    return {
      isOk: response.ok,
      json: await response.json(),
    };
  }

  async getDataNoCors(url) {
    const response = await fetch(`${url}`);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Ошибка, данные не получены   " + `${response.status}`);
    }
  }

  /*attributes: [{key: value}, {key: value}]*/

  createElement(tag, className, parentElement, attributes) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (parentElement) parentElement.append(element);
    if (attributes) {
      attributes.forEach((attr) => {
        const key = Object.keys(attr)[0];
        if (key.split("-").includes("data")) {
          const datasetName = this.createDatasetName(key);
          element.dataset[datasetName] = attr[key];
        } else {
          element.setAttribute(key, attr[key]);
        }
      });
    }
    return element;
  }
}
