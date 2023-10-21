/**
* @param {string|HTMLElement} inputElement can be selector, class or HTML element; returns input value or null
 * */

export default function getInputValue(inputElement){
  if(inputElement instanceof HTMLElement && inputElement.nodeName === 'INPUT') {
    return inputElement.value;
  } else if(typeof inputElement === 'string') {
    const element = document.querySelector(`.${inputElement.split('').includes('.')?inputElement.split('').slice(1).join(''):inputElement}`);
    if(element && element.nodeName === 'INPUT') {
      return element.value;
    } else {
      return null;
    }
  }
}