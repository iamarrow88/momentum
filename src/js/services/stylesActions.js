const stylesActions = {
  "classToRemove": '',
  "newClass": '',
  changeStyle(elementSelector){
    const element = document.querySelector(`${elementSelector}`);
    if(!element) throw new Error(`Элемент с классом ${elementSelector} не найден. Проверьте переданный селектор`)
    if([...element.classList].includes(this.classToRemove)) {
      element.classList.remove(this.classToRemove);
    }
    element.classList.add(this.newClass);
  },
}


export default stylesActions;