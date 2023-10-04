const basic = {

  /* changeElementSvg: function changeElementSvg(element, newUrl, oldClass, newClass) {
    this.changeSvg(element, newUrl);
    element.classList.remove(oldClass);
    element.classList.add(newClass);
    return element;
  }, */
  /* clocks: {
    getDate(lang) {
      return lang;
    },
  }, */
  /* setObjectProperties(mainObject, subObject) {
    const props = subObject.fields;

    for (const prop in props) {
      if (mainObject[prop]) { subObject.fields[prop] = mainObject[prop]; }
    }
    return subObject;
  }, */
  /* searchHTMLElements() {
    for (const className in this.fields.HTMLElements) {
      this.fields.HTMLElements[className] = document.querySelector(this.fields.HTMLElements[className]);
    }
  }, */
  /* massAddEventListeners(HTMLElement, trigger, handler) {
    if (Array.isArray(HTMLElement)) {
      HTMLElement.forEach((element, index) => element.addEventListener(trigger[index], handler[index]));
    }
    return HTMLElement.addEventListener(trigger, handler);
  }, */
  /* createElement(tag, className, parentElement) {
    const element = document.createElement(tag);
    element.classList.add(className);
    parentElement.append(element);
    return element;
  }, */
};

export default basic;
