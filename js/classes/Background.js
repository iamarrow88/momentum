import basic from "../actions/commonFunctions.js";

const Background = {
  fields: {
    timeOfTheDay: null,
    currentPictureNumber: '01',
    dayMap: {
      'morning': {
        start: 5,
        end: 11
      },
      'afternoon': {
        start: 12,
        end: 17
      },
      'evening': {
        start: 18,
        end: 23
      },
      'night': {
        start: 0,
        end: 4
      },
    },
    HTMLElements: {
      'prev': '.slide-prev',
      'next': '.slide-next'
    }
  },
  getPathToPicture(timeOfTheDay, pictureNumber){
    return `https://raw.githubusercontent.com/iamarrow88/bg-collection/main/${timeOfTheDay}/${pictureNumber}.webp`
  },
  getNextPictureNumber(direction, currentPictureNumber){
    //direction = 'next' | 'prev'
    const picturesSum = 20;
    let next;
    if(direction ==='next') {
      next = +currentPictureNumber + 1;
    } else {
      next = +currentPictureNumber - 1;
    }

    if(next < 1){
      return '20';
    } else if(next > 20){
      return '1';
    } else {
      return next.toString();
    }
  },
  startBackground(){
    basic.searchHTMLElements.call(this);
    console.log(this);
  }

}

//module.exports = Background;
export default Background;