from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

from app.models.task import Task
from app.models.project import Project
from app.schemas.task import TaskCreate, TaskUpdate 


def get_tasks(session: Session, user_id: int) -> List[Task]:
    return session.exec(select(Task).where(Task.user_id == user_id)).all()


def get_task(session: Session, task_id: int, user_id: int) -> Optional[Task]:
    return session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()


def create_task(session: Session, task_data: TaskCreate, user_id: int) -> Optional[Task]:
    project = session.exec(
        select(Project).where(Project.id == task_data.project_id, Project.user_id == user_id)
    ).first()
    if project is None:
        return None
    db_task = Task.model_validate(task_data, update={"user_id": user_id})
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

def update_task(session: Session, task_id: int, task_data: TaskUpdate, user_id: int) -> Optional[Task]:
    db_task = get_task(session, task_id, user_id)
    if not db_task:
        return None
    update_data = task_data.model_dump(exclude_unset=True)
    if "project_id" in update_data:
        project = session.exec(
            select(Project).where(Project.id == update_data["project_id"], Project.user_id == user_id)
        ).first()
        if project is None:
            return None
    for key, value in update_data.items():
        setattr(db_task, key, value)
    db_task.updated_at = datetime.now()
    session.commit()
    session.refresh(db_task)
    return db_task


def delete_task(session: Session, task_id: int, user_id: int) -> Optional[Task]:
    db_task = get_task(session, task_id, user_id)
    if not db_task:
        return None
    session.delete(db_task)
    session.commit()
    return db_task
