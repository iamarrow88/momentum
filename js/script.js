/* !TODO
*    смена иконки в плеере при проигрывании,остановке музыки
*    смена языка в приложении (рус, англ, бел)
*    регулировка звука в плеере
*    доделать тудушку
*    передалать настройки (спрятать показать меню, плеер и тп
*    сделать ловушку для цитат, если не подгружается новая (типа упс, не получили цитату, вот вам нашенская рандомная
*    переписать все на классах
*    подгрузка обоев из API*/

const BACKGROUND = document.querySelector('body');
const COVER = document.querySelector('.cover');
const PLAYLIST = document.querySelector('.play-list');
const AUDIO = document.getElementById('player__audio');
const PLAY_PREV = document.querySelector('.play-prev');
const PLAY_PAUSE = document.querySelector('.play');
const PLAY_NEXT = document.querySelector('.play-next');
const MUTE = document.querySelector('.player-controls__mute');
const WEATHER = document.querySelector('.weather');
const WEATHER_INFO = document.querySelector('.weather-info');
const WEATHER_ERROR = document.querySelector('.weather__error-block');
const PREV_SLIDE = document.querySelector('.slide-prev');
const NEXT_SLIDE = document.querySelector('.slide-next');
const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');
const USER_NAME = document.querySelector('.name');
const QUOTE_TEXT = document.querySelector('.quote__quote');
const QUOTE_AUTHOR = document.querySelector('.quote__author');
const CHANGE_QUOTE_BTN = document.querySelector('.quote__change-btn');
const FOOTER = document.querySelector('.footer');
const SETTINGS = document.querySelector('.footer__settings');
const SETTINGS_BLOCK = document.querySelector('.settings-block');
const TO_DO_INPUT = document.querySelector('.to-do__input');
const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const TIME_OPTIONS = { hc: 'h23' };
const CITY_NAME = document.querySelector('.city');
const allAboutThisPage = {
    songs: [
        {
            id: 0,
            author: 'The Moth & The Flame',
            title: 'Simple',
            btn: null,
        },
        {
            id: 1,
            author: 'Coldplay',
            title: 'Paradise',
            btn: null,
        },
        {
            id: 2,
            author: 'Lord Huron',
            title: 'The Night We Met',
            btn: null,
        },
        {
            id: 3,
            author: 'Arcane Roots',
            title: 'Half the World',
            btn: null,
        },
    ],
    songButtons: [],
    timeOfADay: null,
    prevPlayingId: null,
    nowPlayingId: 0,
    isPlaying: false,
    musicCurrentTime: 0,
    isMuted: false,
    cityName: 'Minsk',
    defaultLang: 'en',
    selectedLang: null,
    elements: {},
    tasksCounter: 2,
    greetingTranslation: {
        'en': {
            'night': "Good night",
            'morning': "Good morning",
            'afternoon': "Good afternoon",
            'evening': "Good evening",
            "locales": "en-Gb",
            'name-placeholder': 'Noname',
            'todo-placeholder': 'What would you like to do today?',
            'change-lang': 'Change language',
            'hide-player': 'Hide player ',
            'hide-weather': 'Hide weather ',
            'hide-time': 'Hide time ',
            'hide-date': 'Hide date ',
            'hide-greet': 'Hide greeting ',
            'hide-todo': 'Hide todo ',
            'hide-quote': 'Hide quote ',
            'on': 'ON',
            'off': 'OFF',
            'remove-data': 'Remove user data',
            'ru': 'RU',
            'en': 'EN',

        },
        'ru': {
            'night': "Доброй ночи",
            'morning': "Доброе утро",
            'afternoon': "Добрый день",
            'evening': "Добрый вечер",
            "locales": "ru-Ru",
            'name-placeholder': 'Нонэйм',
            'todo-placeholder': 'Что будем делать сегодня?',
            'change-lang': 'Сменить язык',
            'hide-player': 'Спрятать плеер ',
            'hide-weather': 'Спрятать погоду ',
            'hide-time': 'Спрятать часы ',
            'hide-date': 'Спрятать дату ',
            'hide-greet': 'Спрятать приветствие ',
            'hide-todo': 'Спрятать список дел ',
            'hide-quote': 'Спрятать цитаты ',
            'on': 'Вкл',
            'off': 'Выкл',
            'remove-data': 'Удалить данные пользователя',
            'ru': 'Рус',
            'en': 'Англ',
        },
    },
    classesToHide: ['player', 'weather', 'time', 'date', 'greeting-container', 'to-do', 'quote'],
    langForDate: null,
};



/*--------------------- GET DATE NAD TIME, SET NAME IN THE GREETINGS BLOCK  ------------------------------*/

function changeDate(date, lang){
    const locales = allAboutThisPage.greetingTranslation[lang].locales;
    DATE.textContent = date.toLocaleDateString(locales, DATE_OPTIONS);
}
function getDate(lang) {
    let currentDate = new Date();
    TIME.innerHTML = currentDate.toLocaleTimeString();
    if(currentDate.toLocaleTimeString() ==='00:00:00') {
        changeDate(currentDate, lang);
    }
    greet(currentDate);
    setTimeout(() =>{
        getDate(lang);
    }, 1000);
}

/*------- GREETINGS  -----------*/
function greet(time){
    const lang = allAboutThisPage.selectedLang;
    const hours = time.getHours();
    if(hours > 5 && hours <= 11) {
        if(allAboutThisPage.timeOfADay !== 'morning') {
            allAboutThisPage.timeOfADay = 'morning';
            GREETING.textContent =  `${allAboutThisPage.greetingTranslation[lang]['morning']}, `;
            getImage( allAboutThisPage.timeOfADay, getRandomNUm(20));
        } else {
            if(lang !== allAboutThisPage.selectedLang) {
                GREETING.textContent =  `${allAboutThisPage.greetingTranslation[lang]['morning']}, `;
            }
        }
    } else if (hours > 11 && hours <= 17) {
        if(allAboutThisPage.timeOfADay !== 'afternoon') {
            GREETING.textContent = `${allAboutThisPage.greetingTranslation[lang]['afternoon']}, `;
            allAboutThisPage.timeOfADay = 'afternoon';
            getImage( allAboutThisPage.timeOfADay, getRandomNUm(20));
        } else {
            if(lang !== allAboutThisPage.selectedLang) {
                GREETING.textContent =  `${allAboutThisPage.greetingTranslation[lang]['afternoon']}, `;
            }
        }
    } else if (hours > 17 && hours <= 23) {
        if(allAboutThisPage.timeOfADay !== 'evening') {
            GREETING.textContent = `${allAboutThisPage.greetingTranslation[lang]['evening']}, `;
            allAboutThisPage.timeOfADay = 'evening';
            getImage( allAboutThisPage.timeOfADay, getRandomNUm(20));
        } else {
            if(lang !== allAboutThisPage.selectedLang) {
                GREETING.textContent =  `${allAboutThisPage.greetingTranslation[lang]['evening']}, `;
            }
        }
    } else {
        if(allAboutThisPage.timeOfADay !== 'night') {
            GREETING.textContent = `${allAboutThisPage.greetingTranslation[lang]['night']}, `;
            allAboutThisPage.timeOfADay = 'night';
            getImage( allAboutThisPage.timeOfADay, getRandomNUm(20));
        } else {
            if(lang !== allAboutThisPage.selectedLang) {
                GREETING.textContent =  `${allAboutThisPage.greetingTranslation[lang]['night']}, `;
            }
        }
    }
}

/*  -----SET INFO IN THE LOCALSTORAGE  -----------------------*/
function bringName() {
    localStorage.setItem('userName', `${USER_NAME.value}`);
}

USER_NAME.addEventListener('change', bringName);
/*--------  CAROUSEL  -----------------------*/

function getRandomNUm(n) {
    let num = Math.floor(Math.random() * n + 1).toString();
    if(num < 10) num = 0 + num;
    return num;function getImage(timeOfADay, pictureNumber) {
        BACKGROUND.style.backgroundImage = `url(./assets/img/${timeOfADay}/${pictureNumber}.webp)`;
        allAboutThisPage.currentPicture = pictureNumber;
    }
}



PREV_SLIDE.addEventListener('click', function(){
    let currentPicture = (Number(allAboutThisPage.currentPicture) - 1) <= 0 ?
        20 : Number(allAboutThisPage.currentPicture) - 1;

    currentPicture = currentPicture < 10 ?
        0 + currentPicture.toString() : currentPicture.toString();
    getImage( allAboutThisPage.timeOfADay, currentPicture);
});

NEXT_SLIDE.addEventListener('click', function(){
    let currentPicture = (Number(allAboutThisPage.currentPicture) + 1) > 20 ?
        1 : Number(allAboutThisPage.currentPicture) + 1;

    currentPicture = currentPicture < 10 ?
        0 + currentPicture.toString() : currentPicture.toString();
    getImage( allAboutThisPage.timeOfADay, currentPicture);
});

/*------ AUDIOPLAYER  -----------------------*/

function printSongs(songs, parentBlock) {
    PLAYLIST.innerHTML = '';
    for(let i = 0; i < songs.length; i++) {
        const songBlock = document.createElement('li');
        songBlock.classList.add('song');
        songBlock.dataset.song = `${songs[i].id}`;
        const songTitle = document.createElement('div');
        songTitle.classList.add('song');
        songTitle.innerHTML = `${songs[i].id + 1}. ${songs[i].author} - ${songs[i].title}`;
        const songBtn = document.createElement('div');
        songBtn.insertAdjacentHTML('beforeend', `<svg class = "icon">` +
            '<use xlink:href="assets/svg/sprite.svg#play" class = "icon"></use></svg>');
        songBtn.classList.add('player-icon');
        songBtn.dataset.songbtn=`${i}`;
        songBlock.appendChild(songTitle);
        songBlock.appendChild(songBtn);
        parentBlock.appendChild(songBlock);
        allAboutThisPage.songs[i].btn = songBlock;
    }
    allAboutThisPage.songButtons = document.querySelectorAll('[data-songbtn]');
}

PLAY_PAUSE.addEventListener('click', play);
function play() {
    allAboutThisPage.isPlaying = !allAboutThisPage.isPlaying;
    const songId = allAboutThisPage.nowPlayingId;
    AUDIO.src = `./assets/mp3/${songId}.mp3`;
    if (allAboutThisPage.isPlaying){
        document.querySelector(`[data-song="${songId}"]`).classList.add('playing-song');
        toggleBtn(songId, 'pause');
        AUDIO.play();

    } else {
        document.querySelector(`[data-song="${songId}"]`).classList.remove('playing-song');
        const playingSongBtn = document.querySelector(`[data-songbtn="${songId}"]`);
        toggleBtn(songId, 'play');
        AUDIO.pause();

    }
}
AUDIO.addEventListener('ended', function(){
    play();
    allAboutThisPage.prevPlayingId = allAboutThisPage.nowPlayingId;
    allAboutThisPage.nowPlayingId = Number(allAboutThisPage.nowPlayingId) + 1;

    if(allAboutThisPage.nowPlayingId >= allAboutThisPage.songs.length) {
        allAboutThisPage.nowPlayingId = 0;
    }
    play();
})


MUTE.addEventListener('click', function() {
    if(!allAboutThisPage.isMuted) {
        toggleBtn('player-controls__mute', 'volume');
        AUDIO.volume = 1;
    } else {
        toggleBtn('player-controls__mute', 'mute');
        AUDIO.volume = 0;
    }
    allAboutThisPage.isMuted = !allAboutThisPage.isMuted;
})

function toggleBtn(classOrID, action){
    if(classOrID >= 0) {
        const id = Number(classOrID);
        allAboutThisPage.songButtons[id].innerHTML = '<svg class = "icon">' +
            `<use xlink:href="assets/svg/sprite.svg#${action}" class = "svg"></use></svg>`;
    } else {
        const blockToChange = document.querySelector(`.${classOrID}`);
        blockToChange.innerHTML = '<svg class = "icon">' +
            `<use xlink:href="assets/svg/sprite.svg#${action}" class = "svg"></use></svg>`;
    }
}
PLAYLIST.addEventListener('click', function(event) {
    const selectedSong = event.target.closest('li').dataset.song;
    const songs = document.querySelectorAll('.song');
    songs.forEach(song => song.classList.remove('playing-song'))
    if(selectedSong !== allAboutThisPage.nowPlayingId) {
        allAboutThisPage.prevPlayingId = allAboutThisPage.nowPlayingId;
        allAboutThisPage.nowPlayingId = selectedSong;
        toggleBtn(allAboutThisPage.prevPlayingId, 'play');
        if(allAboutThisPage.isPlaying) {
            allAboutThisPage.isPlaying = !allAboutThisPage.isPlaying;
        }
    }
    play();
})

async function getValue(url) {
    const response = await fetch(`${url}`);
    return response.json();
}

/*------  QUOTES  -----------------------*/

function getQuote() {
    const lang = allAboutThisPage.selectedLang;
    if(lang === 'en') {
        getValue('https://type.fit/api/quotes').then(function(value) {
            const randomNum = getRandomNUm(value.length);
            rewriteTextBlock(value[randomNum])
        });
    } else {
        getValue('./assets/quotes-ru.json').then(function(value) {
            const randomNum = getRandomNUm(value.length);
            rewriteTextBlock(value[randomNum])
        });
    }

}

function rewriteTextBlock(text) {
    document.querySelector('.quote__quote').innerHTML = text.text;
    let author = '';
    if(!text.author) {
        author = 'Somebody';
    } else {
        author = text.author;
    }


    document.querySelector('.quote__author').innerHTML = author;
}
CHANGE_QUOTE_BTN.addEventListener('click', getQuote);

/*---------  WEATHER  -----------------------*/

function getWeather(lang) {
    const cityName = localStorage.getItem('cityName') ? localStorage.getItem('cityName') : 'Minsk';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${lang}&APPID=97cf768248efa3f4a26cfa1ecd146220`;
    getValue(url).then(function(weatherObj) {
        if(weatherObj.message) {
            WEATHER_INFO.classList.add('display-none');
            WEATHER_ERROR.classList.remove('display-none');
            WEATHER_ERROR.innerHTML = `${weatherObj.message}`;
        } else {
            //document.querySelector('.weather-icon').innerHTML = `http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`;
            WEATHER_INFO.classList.remove('display-none');
            WEATHER_ERROR.classList.add('display-none');
            document.querySelector('.temperature').innerHTML = `${Math.round(weatherObj.main.temp)} C, `;
            document.querySelector('.weather-description').innerHTML = `${weatherObj.weather[0].description}`;
            let windBlock = document.querySelector('.wind');
            windBlock.innerHTML = `${weatherObj.wind.speed}`;
            if(lang === 'ru') {
                windBlock.innerHTML += ' м/с';
            } else {
                windBlock.innerHTML += ' m/s';
            }
            document.querySelector('.humidity').innerHTML = `${weatherObj.main.humidity} %`;
        }
    })

}
if(localStorage.getItem('cityName')) {
    CITY_NAME.setAttribute('value', localStorage.getItem('cityName'));
} else {
    CITY_NAME.setAttribute('value', allAboutThisPage.cityName);
}

CITY_NAME.addEventListener('click', function(){
    CITY_NAME.value = '';
    CITY_NAME.setAttribute('placeholder', allAboutThisPage.cityName);
});

CITY_NAME.addEventListener('change', function(event){
    if(event.target.value) {
        localStorage.setItem('cityName', event.target.value);
        getWeather();
        allAboutThisPage.cityName = event.target.value;
    } else {
        CITY_NAME.value = allAboutThisPage.cityName;
    }

})

CITY_NAME.addEventListener('focusout', function (event){
    CITY_NAME.setAttribute('value', allAboutThisPage.cityName);
})

/*---------  SETTINGS  -----------------------*/

SETTINGS.addEventListener('click', function(){
    SETTINGS_BLOCK.classList.toggle('show-settings');
    COVER.classList.toggle('show-cover')
})

BACKGROUND.addEventListener('click', function (event){
    if([...event.target.classList].includes('cover')
        || [...event.target.classList].includes('lang__ru')
        || [...event.target.classList].includes('lang__en')
        || [...event.target.classList].includes('item__delete')) {
        SETTINGS_BLOCK.classList.toggle('show-settings');
        COVER.classList.toggle('show-cover');
    }
})
document.querySelector('.item__delete').addEventListener('click', function () {
    localStorage.clear();
})
/*----HIDE BLOCKS SETTINGS---------------------------*/
function searchWhatToHide() {
    allAboutThisPage.classesToHide.forEach(el => {
        allAboutThisPage.elements[el] = document.querySelector(`.${el}`);
    })
}

document.querySelector('.hide-block').addEventListener('click', function (event){
    const [block, action] = [...event.target.classList];
    const blockName = block.slice(0, -4);
    localStorage.setItem(`${blockName}`, `${action}`);
    const HtmlBlock = document.querySelector(`.${blockName}`);
    if(action === 'on') {
        HtmlBlock.classList.remove('display-none');
    } else {
        HtmlBlock.classList.add('display-none');
    }
})

function checkingBlocksVisibility() {
    allAboutThisPage.classesToHide.forEach(el => {
        allAboutThisPage.elements[el].classList.remove('display-none');
        if(localStorage.getItem(`${el}`) === 'off') {
            allAboutThisPage.elements[el].classList.add('display-none');
        }
    })
}
/*-------- CHANGE LANG SETTINGS ------------------------*/
function setLang() {
    allAboutThisPage.selectedLang = localStorage.getItem('lang') === 'ru' || localStorage.getItem('lang') === 'en' ? localStorage.getItem('lang') : allAboutThisPage.defaultLang;
    localStorage.setItem('lang', `${allAboutThisPage.selectedLang}`);
}

setLang();

function printNewLang(lang) {
    TO_DO_INPUT.setAttribute('placeholder', `${allAboutThisPage.greetingTranslation[lang]['todo-placeholder']}`)
    USER_NAME.setAttribute('placeholder', `${allAboutThisPage.greetingTranslation[lang]['name-placeholder']}`);
    document.querySelector('.setting-name__lang').textContent = allAboutThisPage.greetingTranslation[lang]['change-lang'];
    document.querySelector('.lang__ru').textContent = allAboutThisPage.greetingTranslation[lang]['ru'];
    document.querySelector('.lang__en').textContent = allAboutThisPage.greetingTranslation[lang]['en'];
    document.querySelector('.item__delete').textContent = allAboutThisPage.greetingTranslation[lang]['remove-data'];
    document.querySelector('.hide-block-name__player').textContent = allAboutThisPage.greetingTranslation[lang]['hide-player'];
    document.querySelector('.hide-block-name__weather').textContent = allAboutThisPage.greetingTranslation[lang]['hide-weather'];
    document.querySelector('.hide-block-name__time').textContent = allAboutThisPage.greetingTranslation[lang]['hide-time'];
    document.querySelector('.hide-block-name__date').textContent = allAboutThisPage.greetingTranslation[lang]['hide-date'];
    document.querySelector('.hide-block-name__greeting').textContent = allAboutThisPage.greetingTranslation[lang]['hide-greet'];
    document.querySelector('.hide-block-name__todo').textContent = allAboutThisPage.greetingTranslation[lang]['hide-todo'];
    document.querySelector('.hide-block-name__quote').textContent = allAboutThisPage.greetingTranslation[lang]['hide-quote'];
    document.querySelectorAll('.on').textContent = allAboutThisPage.greetingTranslation[lang]['on'];
    document.querySelectorAll('.off').textContent = allAboutThisPage.greetingTranslation[lang]['off'];
}
document.querySelector('.item__lang').addEventListener('click', function (event) {
    if([...event.target.classList].includes('lang__ru')) {
        localStorage.setItem('lang', 'ru');
        allAboutThisPage.selectedLang = 'ru';
    } else {
        localStorage.setItem('lang', 'en');
        allAboutThisPage.selectedLang = 'en';
    }
    refreshPage();
})
/*--------  TO DO LIST  -----------------------------*/

TO_DO_INPUT.addEventListener('change', function (){
    allAboutThisPage.tasksCounter += 1;
    const task = document.createElement('div');
    task.classList.add('task__item');

    const taskCheck = document.createElement('input');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('id', `task${allAboutThisPage.tasksCounter}`);
    taskCheck.classList.add('to-do__task');

    const taskText = document.createElement('label');
    taskText.setAttribute('for', `task${allAboutThisPage.tasksCounter}`);
    taskText.dataset.task = `task${allAboutThisPage.tasksCounter}`;
    taskText.innerHTML = TO_DO_INPUT.value;
    task.appendChild(taskCheck);
    task.appendChild(taskText);
    document.querySelector('.to-do__task-list').appendChild(task);
    TO_DO_INPUT.value = '';
})

function addListenersTOCheckboxes (){
    const checkboxes = document.querySelectorAll('.to-do__task');
    checkboxes.forEach(box => {
        box.addEventListener('click', function(event){
            const taskId = event.target.id;
            if(event.target.checked) {
                document.querySelector(`[data-task="${taskId}"]`).classList.add('checked');
            } else {
                document.querySelector(`[data-task="${taskId}"]`).classList.remove('checked');

            }
        })
    })
}
addListenersTOCheckboxes ();

/*---------- SET USERNAME AND CITY NAME FROM THE LOCALSTORAGE, GET INFO  ---------------------*/

function refreshPage() {
    getDate(allAboutThisPage.selectedLang);
    getQuote();
    printNewLang(allAboutThisPage.selectedLang);
    checkingBlocksVisibility();
    getWeather(allAboutThisPage.selectedLang);
}
USER_NAME.value = localStorage.getItem('userName');
TO_DO_INPUT.setAttribute('placeholder', `${allAboutThisPage.greetingTranslation[localStorage.getItem('lang')]['todo-placeholder']}`)
USER_NAME.setAttribute('placeholder', `${allAboutThisPage.greetingTranslation[localStorage.getItem('lang')]['name-placeholder']}`)
searchWhatToHide();
printSongs(allAboutThisPage.songs, PLAYLIST);
refreshPage();
getQuote();
const date = new Date();
changeDate(date, allAboutThisPage.selectedLang);



