1. Анализ макета
    - Разбиваем в голове макет на маленькие кусочки
    - Ищем одинаковые элементы, что бы сделать модуль
    - Определяем исрользуемые шрифты и его типы (Figma Plugin - Font Fascia)
    - Определяем основной шрифт и его размер и цвет (смотрим на текстовые блоки)

2. Подготовка
    - Обнуление
    - Добавляем шрифты
    - __container (адаптивность) CSS
    - верстаем модули
    - wrapper делаем на всю высоту экрана
    - позволяем main расширяться что бы прибить footer

3. Верстка
    - header
        - анализируем и разбиваем на блоки
        - выгружаем logo

Notes:
    - rem вместо px (для адаптивности)
    - подключать шрифты в самом верху файла
    - телефон: 767.98px - 320px
    - планшет: 991.98px
    - создание бургера :
        - обертываем то что будет в бургере в (html)
        - делаем кнопку бургер и внутри него span(html)
        - задаем display:none
        .header__burger{
            display: block;
            flex: 0 0 1.875rem;
            height: 1.125rem;
            position: relative;
            z-index: 5;
            background-color: #0D0D11;
        }
        .header__burger span,
        .header__burger::after,
        .header__burger::before{
            content: "";
            position: absolute;
            width: 100%;
            height: 0.125rem;
            right: 0;
            background-color: #fff;
        }
        .header__burger::after{
            top: 0;
        }
        .header__burger::before{
            bottom: 0;
        }
        .header__burger span{
            top: calc(50% - 1px);
        } 
        .menu__body{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: -100%;
            background-color: #0D0D11;
            padding: 6.25rem 0.9375rem 1.875rem 0.9375rem;
            overflow: auto;
            transition: left 0.3s ease;
        }
