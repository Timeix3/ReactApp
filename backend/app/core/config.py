from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ReactApp"
    DATABASE_URL: str
    CORS_ORIGINS: list[str] = ["http://localhost:8080"]

    class Config:
        env_file = ".env"

settings = Settings()