task link https://github.com/rolling-scopes-school/tasks/blob/master/tasks/momentum/momentum-stage1.md

### TODO

-[x]  html код плеера <br>
-[x]  стили страницы <br>
-[x]  fix Player.js <br>
-[ ]  функция по замене иконок (плей и тп) <br>
- [ ] проверить трек, если он был переключен, то записать в приложение новый трек и в локал сторажд тоже

-[ ]  функция начала и окончания воспроизведения <br>
- [ ] название трека в прогресс баре
- [ ] доработать и применить функцию  shouldPlay(buttonName) в плеере
-[ ]  функция переключения треков (след/предыдущий) <br>
-[ ]  функция переключения треков по клику на трек <br>
-[ ]  если song__title больше, чем определенное кол во знаков, то сократить <br>
- [ ] играть/пауза (с запоминанием в локал сторадж номера трека, плей изначально всегда фолс)
- [ ] переключение на следующий/предыдущий треки (обновить текущий трек в приложении и локал сторадж
- [ ] если текущий трек закончился - начать играть следующий
- [ ] звук вкл/выкл
- [ ] отслеживание уровня громкости, если звук вкл, если выкл, то просто отслеживать и запоминать уровень громкости (в приложение и в локал сторадж) HTMLMediaElement.volume
- [ ] отображение прогресс бара, если трек выбран
- [ ] возможность переключения прогресса воспроизведения трека
- [ ] возможность переключения треков как по клику на соотв иконку плей, так и по самому треку
- [ ] смена иконок при плей/пауза, вкл/выкл звку и тп
- [ ] анимация шариков при проигрывании песни
- [ ] сделать случайный режим
- [ ] повторять выбранный трек по кругу - HTMLMediaElement.loop
-[ ]  на все, что нажимается, сделать курсор пойнтер <br>
-[ ]  все инпуты выровнять, чтобы нормально смотрелось (В т ч в адаптиве) <br>
-[ ]  перевод ошибки погоды при смене языка? <br>
-[x] смена иконки в плеере при проигрывании, остановке музыки
-[x] смена языка в приложении (рус, англ, бел)
-[x] регулировка звука в плеере
-[x]  доделать тудушку (удаление задачи)
-[x] передалать настройки (спрятать показать меню, плеер и тп 
-[x]  сделать ловушку для цитат, если не подгружается новая (типа упс, не получили цитату, вот вам нашенская рандомная
-[ ]  для предыдущего пункта сделать всплывающее окно
-[x] переписать все на классах
-[x] подгрузка обоев из UnsplashApi 
-[Х]  сделать подложку под блоки (вкл/выкл)
-[ ]  к предыдущему пункту добавить сохранение статуса подложки в локал сторадж 
        считывание статуса при загрузке страницы и соотв отображение
-[ ]  сделать сортировку тасков по id
- [ ]  добавить возможность сохранять настройку скрыты сделанные таски или нет
-[ ]  сделать отдельный модуль с функциями удаления, досбалвения и пр из локал сторадж
-[ ]  выбор цвета для шрифта на странице
-[ ]  возможность отключать/отображать подложку для блоков
-[ ]  Обновление данных при их изменении во всех заинтересованных компонентах
-[ ]  после того, как спрятан блок, нужно записать его состояние в локал сторадж (
* В локал сторадж
  1. текущий трек
  4. уровень звука
  5. вкл/выкл звук
  5. вкл/выкл звук
 )
-[ ]  при любом изменении, которое потом должно быть восстановлено после обновления страницы,
    нужно обновить локал сторадж
-[ ]  почитстить код от комментариев и консоль логов
- [ ] переписать HTML, где на нужных кнопках будет dataset
- [ ] проверить, чтобы в тех местах, где HTML генерируется js, разметка совпадала с "черновиком"
- [ ] включить динамическую генерацию плейлиста
- [ ] возможность скачать фоновую картинку
- [ ] возможность в плеере установить проигрывание песен в случайном порядке
- [ ] при смене языка через настройки менять также язык отображения даты (сейчас не меняется)
- [ ] при смене языка обновлять его у всех компонентов
- [ ] сделать прокрутку, если очень много треков,задач
- [ ] выделение выбранных кнопок в настройках (стили)
- [ ] если цитата большая, сделать "...", по клику на которое она разворачивается
  - [ ] у плеера починить отображение уровня звука, сделать синхронизацию треугольника звука, запись в локал
    сторадж