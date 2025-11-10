# Основні можливості (реалізовано)

Стейт-менеджмент (Redux Toolkit)
Додано Redux store з двома слайсами:

settingsSlice — зберігає рівень, швидкість, звук (синхронізується з localStorage).

resultsSlice — зберігає результати по userId (також зберігається в localStorage).

Додано типізовані хуки: useAppSelector, useAppDispatch.

SettingsForm
Переписано для роботи з Redux:

Читання налаштувань через useAppSelector.

Оновлення через dispatch(setSettings(...)).

Валідація через react-hook-form + yup.

GamePage
Замість контексту використовуються налаштування з Redux.

Після завершення гри результат зберігається через dispatch(saveResult(...)).

ResultsPage
Результати читаються з Redux: results.byUser[userId].

Кнопка "Очистити" викликає dispatch(clearUserResults(...)).

Роутинг
Залишився без змін: react-router-dom, динамічний userId.

Стилізація

# Запуск локально

Клонувати репозиторій: git clone https://github.com/ZaDs-sisadm/emotionalcards/tree/lab5

Перейти в папку: cd lab5

Встановити залежності: npm install

Встановити додаткові пакети (якщо ще не встановлені): npm install react-router-dom react-hook-form yup @hookform/resolvers

Налаштувати Tailwind і постпроцесори (якщо ще не зроблено): npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p

Перезапустити dev-сервер: npm run dev або npm start

Відкрити в браузері: http://localhost:3000