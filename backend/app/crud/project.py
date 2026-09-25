from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException
from sqlmodel import Session, select, update

from app.models.project import Project
from app.models.task import Task
from app.schemas.project import ProjectCreate, ProjectUpdate 


def get_projects(session: Session, user_id: int) -> List[Project]:
    return session.exec(select(Project).where(Project.user_id == user_id)).all()


def get_project(session: Session, project_id: int, user_id: int) -> Optional[Project]:
    db_project = session.exec(
        select(Project).where(Project.id == project_id, Project.user_id == user_id)
    ).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


def get_default_project(session: Session, user_id: int) -> Optional[Project]:
    default_project = session.exec(
        select(Project).where(Project.is_default, Project.user_id == user_id)
    ).first()
    if not default_project:
        return None
    return default_project


def get_project_tasks(session: Session, project_id: int, user_id: int) -> List[Task]:
    return session.exec(
        select(Task).where(Task.project_id == project_id, Task.user_id == user_id)
    ).all()


def create_project(session: Session, project_data: ProjectCreate, user_id: int) -> Project:
    db_project = Project.model_validate(project_data, update={"user_id": user_id})
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

def update_project(session: Session, project_id: int, project_data: ProjectUpdate, user_id: int) -> Optional[Project]:
    db_project = get_project(session, project_id, user_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    update_data = project_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    db_project.updated_at = datetime.now()
    session.commit()
    session.refresh(db_project)
    return db_project


def delete_project(session: Session, project_id: int, user_id: int) -> Optional[Project]:
    db_project = get_project(session, project_id, user_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    if db_project.is_default:
        raise HTTPException(status_code=400, detail="Cannot delete default project")
    move_tasks_to_default_project(session, project_id, user_id)
    session.delete(db_project)
    session.commit()
    return db_project


def move_tasks_to_default_project(session: Session, project_id: int, user_id: int):
    default_project = get_default_project(session, user_id)
    if default_project is None:
        return
    session.exec(
        update(Task)
        .where(Task.project_id == project_id, Task.user_id == user_id)
        .values(project_id=default_project.id)
    )
    session.commit()