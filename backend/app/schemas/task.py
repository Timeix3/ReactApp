from typing import Optional

from pydantic import ConfigDict

from sqlmodel import Field, SQLModel


class TaskBase(SQLModel):
    title: str
    desc: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    desc: Optional[str] = None


class TaskRead(TaskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
