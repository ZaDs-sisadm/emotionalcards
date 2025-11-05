# Що включено

Сторінки: StartPage, GamePage, ResultsPage

# Компоненти:

UI: Button, Logo, IconPlaceholder

Layout: Container, Header

Game: EmojiCard, Grid

Shared: TimerPlaceholder, MovesPlaceholder, TextPlaceholder

Базові CSS: variables.css, global.css

Типи: types.d.ts

Налаштування для швидкого запуску з Vite / CRA (без логіки)

# Що відсутнє (важливо) 

Перевірка пар карток (matching logic)

Ігрова логіка відкривання/закривання карток і визначення знайдених пар

Таймер/лічильник часу, що відраховує час гри

Лічильник ходів (moves counter) з реальною логікою

Збереження і відображення результатів (локальне або на сервері)

Роутинг між сторінками (у проєкті перемикання сторінок реалізовано через App state, без react-router)

Перевірки доступності та розширена валідація даних

# Як запустити (швидко)

Клонуйте репозиторій

Встановіть залежності:

npm install

Запустіть dev-сервер:

npm run dev або npm start (залежно від шаблону)

Відкрийте http://localhost:3000 (або адресу, яку виведе збірник

#Структура проекту

src/
├─ components/
│  ├─ Game/
│  │  ├─ EmojiCard.tsx
│  │  └─ Grid.tsx
│  ├─ Layout/
│  │  └─ Container.tsx
│  ├─ Shared/
│  │  ├─ TimerPlaceholder.tsx
│  │  └─ MovesPlaceholder.tsx
│  └─ UI/
│     ├─ Button.tsx
│     └─ Logo.tsx
├─ pages/
│  ├─ StartPage.tsx
│  ├─ GamePage.tsx
│  └─ ResultsPage.tsx
├─ styles/
│  ├─ variables.css
│  └─ global.css
├─ App.tsx
└─ index.tsx

