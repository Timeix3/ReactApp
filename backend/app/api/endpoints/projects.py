from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.crud.project import (
    get_projects,
    get_project,
    get_project_tasks,
    create_project,
    update_project,
    delete_project,
)
from app.schemas.project import ProjectCreate, ProjectRead, ProjectUpdate
from app.services.project import ensure_default_project_exists
from app.schemas.task import TaskRead

api_router = APIRouter()

@api_router.get("", response_model=List[ProjectRead])
def read_projects(session: Session = Depends(get_session)):
    ensure_default_project_exists(session)
    return get_projects(session)


@api_router.get("/{project_id}", response_model=ProjectRead)
def read_project(project_id: int, session: Session = Depends(get_session)):
    return get_project(session, project_id)


@api_router.get("/{project_id}/tasks", response_model=List[TaskRead])
def read_project_tasks(project_id: int, session: Session = Depends(get_session)):
    return get_project_tasks(session, project_id)


@api_router.post("", response_model=ProjectRead, status_code=201)
def create_new_project(project_in: ProjectCreate, session: Session = Depends(get_session)):
    return create_project(session, project_in)


@api_router.patch("/{project_id}", response_model=ProjectRead)
def update_existing_project(project_id: int, project_in: ProjectUpdate, session: Session = Depends(get_session)):
    return update_project(session, project_id, project_in)


@api_router.delete("/{project_id}", response_model=ProjectRead)
def delete_existing_project(project_id: int, session: Session = Depends(get_session)):
    return delete_project(session, project_id)