export default function changeHandler(e, options){
  if([...e.target.classList].includes('volume-bar__range')) {
    console.log('volume-bar__range', e.target.value);
  }
}