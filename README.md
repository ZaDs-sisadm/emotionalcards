# Основні можливості (реалізовано)

Ігрова логіка в хуках:

useGame — генерація пар, відкриття карток, перевірка пар, moves, reset.

useTimer — секундомер з запуском/скидання.

useResults — історія/збереження результатів у localStorage.

Налаштування гри з формою (react-hook-form + yup):

рівень (easy / medium / hard),

швидкість (slow / normal / fast),

звук (on/off).

Налаштування зберігаються в SettingsContext і синхронізуються з localStorage.

Модальне вікно завершення гри (FinishModal) реалізовано через Portal; показує результат і дозволяє:

перезапустити поточний тур,

перейти до наступного рівня.

Перемикання сторінок через App state: StartPage, GamePage, ResultsPage (без react-router).

Базові UI-компоненти і стилі (variables.css, global.css).

# Що не реалізовано

Немає бекенду для збереження результатів (усе локально в localStorage).

UI — мінімальний, без повної доступності/міжнародних перекладів.

useResults збереження записів у localStorage; якщо потрібно — можна винести results у Context Provider для глобального доступу.

# Запуск локально

Клонувати репозиторій: git clone https://github.com/ZaDs-sisadm/emotionalcards/blob/lab3

Встановити залежності: npm install

Запустити dev-сервер: npm run dev або npm start

Відкрити в браузері: http://localhost:3000 (або адресу, яку видасть збірник)
