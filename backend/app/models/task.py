from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    desc: Optional[str] = None
    project_id: int
    user_id: int
    created_at: datetime = Field(default_factory=datetime.today)
    updated_at: Optional[datetime] = None
