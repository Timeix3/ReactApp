from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.crud.task import (
    get_tasks,
    get_task,
    create_task,
    update_task,
    delete_task,
)
from app.schemas.task import TaskCreate, TaskRead, TaskUpdate

api_router = APIRouter()

@api_router.get("/", response_model=List[TaskRead])
def read_tasks(session: Session = Depends(get_session)):
    return get_tasks(session)


@api_router.get("/{task_id}", response_model=TaskRead)
def read_task(task_id: int, session: Session = Depends(get_session)):
    task = get_task(session, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@api_router.post("/", response_model=TaskRead, status_code=201)
def create_new_task(task_in: TaskCreate, session: Session = Depends(get_session)):
    return create_task(session, task_in)


@api_router.patch("/{task_id}", response_model=TaskRead)
def update_existing_task(task_id: int, task_in: TaskUpdate, session: Session = Depends(get_session)):
    task = update_task(session, task_id, task_in)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@api_router.delete("/{task_id}", response_model=TaskRead)
def delete_existing_task(task_id: int, session: Session = Depends(get_session)):
    task = delete_task(session, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
