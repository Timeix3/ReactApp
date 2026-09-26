# Backend API

Backend приложения ReactApp построен на FastAPI и отвечает за хранение данных, авторизацию, бизнес-логику и REST API для фронтенда. Он работает с PostgreSQL через SQLModel и обеспечивает защиту пользовательских данных по принципу "один пользователь — свои проекты и задачи".

## Что делает backend

- Аутентификация по username/password
- Генерация JWT-токенов
- CRUD для проектов
- CRUD для задач
- Привязка задач и проектов к конкретному `user_id`
- Автоматическое создание default-проекта "Текучка"
- Поддержка CORS для фронтенд-сервиса
- Backend тесно интегрирован с frontend через стандартный REST-интерфейс и типизацию Pydantic/SQLModel

## Стек

- Python 3.12
- FastAPI
- SQLModel
- PostgreSQL
- Pydantic Settings
- JWT (`python-jose`)
- bcrypt
- Alembic
- pytest
- Ruff

## Структура backend

```text
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── projects.py
│   │   │   ├── tasks.py
│   │   │   ├── users.py
│   │   │   └── __init__.py
│   │   └── router.py
│   ├── core/
│   │   ├── auth.py
│   │   ├── config.py
│   │   └── database.py
│   ├── crud/
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── user.py
│   │   └── __init__.py
│   ├── models/
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── user.py
│   │   └── __init__.py
│   ├── schemas/
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── user.py
│   │   ├── base_scheme.py
│   │   └── __init__.py
│   ├── services/
│   │   ├── auth.py
│   │   ├── project.py
│   │   └── __init__.py
│   ├── main.py
│   └── __init__.py
├── alembic/
├── alembic.ini
├── Dockerfile
├── requirements.txt
├── requirements-dev.txt
├── pyproject.toml
└── README.md
```

## Модели данных

### User

```python
class User(SQLModel, table=True):
    id: Optional[int]
    username: str
    hashed_password: str
```

- Уникальный логин пользователя
- Пароль хранится в зашифрованном виде

### Project

```python
class Project(SQLModel, table=True):
    id: Optional[int]
    title: str
    desc: Optional[str]
    is_default: bool
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]
```

- Пользовательские проекты
- Один default-проект `Текучка` на каждого пользователя
- Признак `is_default` позволяет блокировать удаление и автоматически обрабатывать задачи без проекта

### Task

```python
class Task(SQLModel, table=True):
    id: Optional[int]
    title: str
    desc: Optional[str]
    project_id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]
```

- Каждая задача привязана к проекту и пользователю
- При удалении проекта задачи могут быть перенесены в default-проект

## API эндпоинты

### Auth

- `GET /api/auth` — получить текущего пользователя
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — логин и выдача JWT

### Projects

- `GET /api/projects` — список проектов текущего пользователя
- `GET /api/projects/{project_id}` — конкретный проект
- `GET /api/projects/{project_id}/tasks` — задачи проекта
- `POST /api/projects` — создать проект
- `PATCH /api/projects/{project_id}` — обновить проект
- `DELETE /api/projects/{project_id}` — удалить проект

### Tasks

- `GET /api/tasks` — все задачи текущего пользователя
- `GET /api/tasks/{task_id}` — задача по id
- `POST /api/tasks` — создать задачу
- `PATCH /api/tasks/{task_id}` — обновить задачу
- `DELETE /api/tasks/{task_id}` — удалить задачу

## Аутентификация

Backend использует OAuth2 Password Flow с JWT:

- Пользователь отправляет `username` и `password`
- Сервер проверяет пароль через `bcrypt`
- Если данные корректны, генерируется `access_token`
- Токен передаётся в заголовке `Authorization: Bearer ...`
- `get_current_user` декодирует токен и получает пользователя по `sub`

## Конфигурация

Конфигурация хранится в `app/core/config.py` и читает переменные из `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres_password@db:5432/app_db
SECRET_KEY=super-secret-key-change-me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
CORS_ORIGINS=["http://localhost:8080"]
```

## Работа с БД

- `get_session()` создаёт SQLModel `Session`
- Все CRUD-функции работают через `select(...)`, `Session.add()`, `Session.commit()`
- Для миграций используется Alembic

## Запуск

```bash
docker compose up backend --build -d
```

## Тестирование

Проект настроен на Pytest. Команда:

```bash
pytest
```

## Документация API

После запуска FastAPI доступна Swagger UI:

- http://localhost:8000/docs