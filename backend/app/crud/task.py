from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

from app.core.database import get_session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate 


def get_tasks(session: Session) -> List[Task]:
    return session.exec(select(Task)).all()


def get_task(session: Session, task_id: int) -> Optional[Task]:
    return session.get(Task, task_id)


def create_task(session: Session, task_data: TaskCreate) -> Task:
    db_task = Task.model_validate(task_data)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

def update_task(session: Session, task_id: int, task_data: TaskUpdate) -> Optional[Task]:
    db_task = session.get(Task, task_id)
    if not db_task:
        return None
    update_data = task_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
    db_task.updated_at = datetime.now()
    session.commit()
    session.refresh(db_task)
    return db_task


def delete_task(session: Session, task_id: int) -> Optional[Task]:
    db_task = session.get(Task, task_id)
    if not db_task:
        return None
    session.delete(db_task)
    session.commit()
    return db_task
