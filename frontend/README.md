# React Frontend

Фронтенд часть приложения ReactApp — это интерфейс для управления задачами и проектами. Основная цель — обеспечить удобную работу с личными списками задач, модальными окнами и JWT-аутентификацией без лишних перезагрузок страницы.

## Что реализовано

- Страница входа и регистрации
- Защищённый маршрут для авторизованных пользователей
- Страница задач и проектов
- Модальные окна создания/редактирования сущностей
- Динамическое обновление данных через RTK Query
- Вся логика доступа и данных разделена по feature-модулям
- В приложении активно используются кастомные hooks для работы с данными и действиями

## Стек

- React 19
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router DOM
- Tailwind CSS
- Vitest
- Testing Library
- ESLint

## Структура frontend

```text
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── ModalRouter.tsx
│   │   └── store.ts
│   ├── features/
│   │   ├── auth/
│   │   ├── projects/
│   │   └── tasks/
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── NavPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── TasksPage.tsx
│   ├── shared/
│   │   ├── lib/
│   │   └── ui/
│   ├── store/
│   │   ├── apiHeaders.ts
│   │   ├── authApi.ts
│   │   ├── authSlice.ts
│   │   ├── projectsApi.ts
│   │   ├── rootApi.ts
│   │   ├── tasksApi.ts
│   │   └── uiSlice.ts
│   ├── types/
│   │   └── index.ts
│   ├── index.css
│   └── main.tsx
├── package.json
├── Dockerfile
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── README.md
```

## Основные сущности UI

### Auth

- `LoginModal` — вход пользователя
- `RegisterModal` — регистрация пользователя
- `useAuthActions` — логика входа/регистрации
- `authSlice` — хранение JWT-токена и текущего пользователя

### Projects

- `ProjectList` — список проектов
- `ProjectCard` — один проект с количеством задач
- `CreateProjectModal` — создание нового проекта
- `EditProjectModal` — редактирование и удаление проекта
- `CreateProjectTaskModal` — создание задачи прямо из проекта
- `ProjectPreview` — краткая информация о проекте при создании задачи

### Tasks

- `TaskList` — список задач
- `TaskCard` — карточка задачи
- `CreateTaskModal` — создание новой задачи
- `EditProjectTaskModal` — редактирование задачи

## Состояние и данные

Фронтенд использует Redux Toolkit и RTK Query:

- `authApi` — запросы к `/api/auth`
- `projectsApi` — запросы к `/api/projects`
- `tasksApi` — запросы к `/api/tasks`
- `rootApi` — общий API-сервис с базовым URL и заголовками
- `uiSlice` — состояние открытых модальных окон и текущих редактируемых сущностей
- `authSlice` — данные аутентификации

## Авторизация

После успешного логина frontend сохраняет `access_token` в `localStorage` и добавляет его в заголовки запросов через `prepareAuthHeaders`.

Для защищённых путей используется `NavPage`, который проверяет наличие пользователя и редиректит на `/login`, если токен отсутствует или запрос невалиден.

## Запуск

```bash
docker compose up frontend --build -d
```

## Тестирование

Проект настроен на Vitest и Testing Library. Команды:

```bash
npm test
npm run test:watch
```
