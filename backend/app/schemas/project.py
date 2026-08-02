from typing import Optional
from sqlmodel import Field

from app.schemas.base_scheme import BaseScheme


class ProjectBase(BaseScheme):
    title: str
    desc: Optional[str] = None
    is_default: bool = Field(default=False) 


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseScheme):
    title: Optional[str] = None
    desc: Optional[str] = None


class ProjectRead(ProjectBase):
    id: int