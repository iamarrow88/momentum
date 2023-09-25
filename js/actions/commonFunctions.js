const basic = {
  'changeSvg': function changeSvg(svgUse, url){
    return svgUse.setAttribute('href', url);
  },
  'changeElementSvg': function(element, newUrl, oldClass, newClass) {
    this.changeSvg(element, newUrl);
    element.classList.remove(oldClass);
    element.classList.add(newClass);
    return element;
  },
  clocks: {
    'getDate': function (lang) {
      return lang;
    },
  },
  setObjectProperties(mainObject, subObject){
    const props = subObject.fields;

    for(let prop in props) {
      if(mainObject[prop])
        subObject.fields[prop] = mainObject[prop];
    }
    return subObject;
  },

}

export default basic;