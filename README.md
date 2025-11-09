# Основні можливості (реалізовано)

Чисті компоненти і сторінки: StartPage, GamePage, ResultsPage, UserPage.

Ігрова логіка в хуках:

useGame — генерація карток, відкриття/матчинг, moves, reset.

useTimer — секундомір (start/reset).

useResults / ResultsContext — збереження результатів в localStorage; per-user результати через ResultsContext.

Налаштування гри:

SettingsContext + SettingsForm (react-hook-form + yup); синхронізація з localStorage.

Параметри: level (easy|medium|hard), speed (slow|normal|fast), sound (on/off).

Модальне вікно завершення гри:

FinishModal реалізовано через Portal; показує результат, дозволяє повторити або перейти до наступного туру.

Роутинг:

/ — StartPage

/user/:userId — UserPage

/user/:userId/game — GamePage

/user/:userId/results — ResultsPage

Стилізація: Tailwind CSS (директиви в src/styles/global.css).

Легка система state management: SettingsContext + ResultsContext (контекстний підхід).
# Запуск локально

Клонувати репозиторій: git clone https://github.com/ZaDs-sisadm/emotionalcards/tree/lab4

Перейти в папку: cd lab4

Встановити залежності: npm install

Встановити додаткові пакети (якщо ще не встановлені): npm install react-router-dom react-hook-form yup @hookform/resolvers

Налаштувати Tailwind і постпроцесори (якщо ще не зроблено): npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p

Перезапустити dev-сервер: npm run dev або npm start

Відкрити в браузері: http://localhost:3000