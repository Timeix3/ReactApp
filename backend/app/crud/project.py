from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException
from sqlmodel import Session, select, update

from app.models.project import Project
from app.models.task import Task
from app.schemas.project import ProjectCreate, ProjectUpdate 


def get_projects(session: Session) -> List[Project]:
    return session.exec(select(Project)).all()


def get_project(session: Session, project_id: int) -> Optional[Project]:
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


def get_default_project(session: Session) -> Optional[Project]:
    default_project = session.exec(select(Project).where(Project.is_default == True)).first()
    if not default_project:
        return None
    return default_project


def get_project_tasks(session: Session, project_id: int) -> List[Task]:
    return session.exec(select(Task).where(Task.project_id == project_id)).all()


def create_project(session: Session, project_data: ProjectCreate) -> Project:
    db_project = Project.model_validate(project_data)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

def update_project(session: Session, project_id: int, project_data: ProjectUpdate) -> Optional[Project]:
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    update_data = project_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    db_project.updated_at = datetime.now()
    session.commit()
    session.refresh(db_project)
    return db_project


def delete_project(session: Session, project_id: int) -> Optional[Project]:
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    if db_project.is_default:
        raise HTTPException(status_code=400, detail="Cannot delete default project")
    move_tasks_to_default_project(session, project_id)
    session.delete(db_project)
    session.commit()
    return db_project


def move_tasks_to_default_project(session: Session, project_id: int):
    default_project = get_default_project(session)
    session.exec(update(Task).where(Task.project_id == project_id).values(project_id=default_project.id))
    session.commit()