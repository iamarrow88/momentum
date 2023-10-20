export default function (inputElement){
  if(inputElement instanceof HTMLElement) {
    return inputElement.value;
  } else if(typeof inputElement === 'string') {
    return document.querySelector(`.${inputElement}`).value;
  }
}