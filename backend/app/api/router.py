from fastapi import APIRouter
from app.api.endpoints import tasks, projects, users

api_router = APIRouter()

api_router.include_router(tasks.api_router, prefix="/tasks", tags=["tasks"])
api_router.include_router(projects.api_router, prefix="/projects", tags=["projects"])
api_router.include_router(users.api_router, prefix="/auth", tags=["auth"])