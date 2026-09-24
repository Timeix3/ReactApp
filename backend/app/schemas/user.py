from sqlmodel import SQLModel
from app.schemas.base_scheme import BaseScheme

class UserCreate(BaseScheme):
    username: str
    password: str


class UserRead(BaseScheme):
    id: int
    username: str


class Token(SQLModel):
    access_token: str
    token_type: str