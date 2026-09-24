from typing import Optional

from app.schemas.base_scheme import BaseScheme

class TaskBase(BaseScheme):
    title: str
    desc: Optional[str] = None
    project_id: int


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseScheme):
    title: Optional[str] = None
    desc: Optional[str] = None
    project_id: Optional[int] = None


class TaskRead(TaskBase):
    id: int
