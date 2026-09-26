# ReactApp

ReactApp — это full-stack приложение для управления задачами и проектами с системой авторизации, личным рабочим пространством пользователя и структурированным управлением списками задач. Проект состоит из двух независимых частей: frontend на React + TypeScript и backend на FastAPI + PostgreSQL.

## Что умеет приложение

- Регистрация и вход в систему с JWT-токенами
- Создание, редактирование и удаление проектов
- Автоматическое создание проекта "Текучка" для задач без привязки к проекту
- Создание, просмотр, обновление и удаление задач
- Привязка задач к конкретному проекту
- Просмотр задач по проектам и общий список всех задач
- Модальные окна для работы с сущностями без перезагрузки страницы
- Защищённые API-эндпоинты, доступные только авторизованным пользователям
- Контейнеризация через Docker Compose для запуска всего стека одной командой

## Архитектура

Проект организован как монорепозиторий:

- frontend/ — пользовательский интерфейс на React 19, Vite, TypeScript, Redux Toolkit, RTK Query, React Router
- backend/ — REST API на FastAPI, SQLModel, PostgreSQL, JWT-аутентификация
- docker-compose.yaml — запуск PostgreSQL, backend и frontend в контейнерах

## Стек технологий

### Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router DOM
- Tailwind CSS
- Vitest + Testing Library
- ESLint

### Backend

- Python 3.12
- FastAPI
- SQLModel
- PostgreSQL
- Pydantic Settings
- JWT via python-jose
- bcrypt для хеширования паролей
- Alembic для миграций
- Ruff для линтинга
- Pytest для тестов

### Инфраструктура

- Docker
- Docker Compose
- GitHub Actions для CI/CD

## Структура проекта

```text
ReactApp/
├── README.md
├── docker-compose.yaml
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.*
└── .github/
```

## Функциональность по модулям

### Авторизация

- Регистрация нового пользователя
- Вход по username/password
- Получение access_token в формате OAuth2 Password Flow
- JWT-токен используется для защищённого доступа к задачам и проектам

### Проекты

- Создание проекта с названием и описанием
- Обновление информации о проекте
- Удаление проекта с переносом задач в "Текучка" (при необходимости)
- Запрет на удаление проекта "Текучка"
- Подсчёт количества задач в каждом проекте
- Приоритет для default-проекта в интерфейсе

### Задачи

- Создание задачи с заголовком, описанием и выбором проекта
- Обновление данных задачи
- Удаление задачи
- Привязка задачи к пользователю и проекту

### UI/UX

- Модальное окно для создания проекта
- Модальное окно для редактирования проекта
- Модальное окно для создания задачи
- Модальное окно для редактирования задачи
- Навигация между страницами задач и проектов
- Компонентная структура с отдельными UI-элементами и логикой

## Запуск через Docker Compose

1. Убедитесь, что установлен Docker и Docker Compose.
2. В корне проекта создайте файл `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres_password@db:5432/app_db
SECRET_KEY=super-secret-key-change-me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

3. Запустите проект:

```bash
docker compose up --build -d
```

4. Откройте интерфейс:

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs

## CI/CD

GitHub Actions настроены на проверку:

- frontend: ESLint, unit tests, build
- backend: Ruff, Pytest, сборку Docker-образа
- запуск выполняется при push в `main`, на pull request и вручную

## Дополнительные замечания

- API строится вокруг REST-эндпоинтов и моделей SQLModel
- Все пользовательские данные изолированы по `user_id`
- Вся работа с данными идёт через `Session` и SQLModel queries
- В проекте применяется модальная архитектура интерфейса, а данные синхронизируются через Redux Toolkit + RTK Query
