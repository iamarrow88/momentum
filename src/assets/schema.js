/*
*
            * ((player            weather  ) )
*
* prev-slide                                    next-slide
*
*                     time
*                     date
*                     name
*
*
*       to-do                                     quotes
*
*     settings
*
*
*
*
*
*
*  TODO - сделать главным компонентом settings, перенести туда слушателей событий
*   по всем иконкам в настройках + сделать функцию ресет страницы, чтобы ее можно
* было вызывать для перерисовки всей страницы (при изменении языка, удалении данных пользователя,
* выборе в качестве источника цитат или обоев альтернативы)
*
* buttons:
*
* + player - prev, play, next, volume, range, song-title, song-play +
*     - можно сделать отдельную функцию для обработки кликов по плееру
*
* + weather: input (+key enter) + div (city) +
*
* + name: input (+key enter) + div (name) : data-action="name__input"|data-action="name__div"
*
* + slides: prev + next: data-action="slide-prev"|data-action="slide-next" +
*
* + to-do: input (+key enter) data-action="todo-input",
*        checkboxes, {delete, edit, submit,  - data-action="task-edit",
        * "item__delete","task-submit"}
        * hide tasks - data-action="todo-hide-completed"
*
* + quotes: refresh - data-action="quote-refresh"
*
* settings: lang (2 buttons), user data (2 buttons + 2 inputs), hide blocks (8 buttons),
*           bg source (2 buttons: settings-hide-background-github, settings-hide-background-api),
* quotes source (2 buttons: data-action="settings-hide-quotes-api",settings-hide-quotes-github )
*
* настройки закрываются по клику на любую область, кроме инпутов в юзер датаю Если клик по юзер дата редактивроат, то отбразить
* соответствующий блок
*
*
* */


/*
* data-action="name__input"|data-action="name__div"
*
*
* 1. клик по инпуту - ничего не происходит
* 2. клик по диву с именем - он становится инпутом
* 3. клик по любой другой области, при наличии инпута - забирает данные из инпута и, если имя есть, присваивает его в объкт +
* локал сторадж. генерит див с именем
* */


/*
* + weather: input city-name-input(+key enter) + div (city) city-name-div+
*
* 1. клик по инпуту - ничего не происходит
* 2. клик по диву с названием города - создает инпут
* 3. клик по любой другой области - забирает данные из инпута, если они есть, обновляем данные города, запрос погоды.
* генерация див с названием города
* */