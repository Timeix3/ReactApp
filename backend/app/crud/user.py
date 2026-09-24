from sqlmodel import Session, select
from typing import Optional
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.auth import get_password_hash


def get_user(session: Session, username: str) -> Optional[User]:
    return session.exec(select(User).where(User.username == username)).first()


def create_user(session: Session, user_data: UserCreate) -> User:
    user = User(username=user_data.username, hashed_password=get_password_hash(user_data.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user