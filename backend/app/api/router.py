from fastapi import APIRouter
from app.api.endpoints import tasks, projects

api_router = APIRouter()

api_router.include_router(tasks.api_router, prefix="/tasks", tags=["tasks"])
api_router.include_router(projects.api_router, prefix="/projects", tags=["projects"])