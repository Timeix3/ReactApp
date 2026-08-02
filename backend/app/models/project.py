from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime


class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    desc: Optional[str] = None
    is_default: bool
    created_at: datetime = Field(default_factory=datetime.today)
    updated_at: Optional[datetime] = None