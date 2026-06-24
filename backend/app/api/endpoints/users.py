from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.crud.user import get_users, create_user
from app.schemas.user import UserCreate, UserRead
from app.api.deps import get_current_user # Если нужна авторизация

router = APIRouter()

@router.get("/", response_model=List[UserRead])
def read_users(
    skip: int = 0, 
    limit: int = 100, 
    session: Session = Depends(get_session)
):
    users = get_users(session, skip=skip, limit=limit)
    return users

@router.post("/", response_model=UserRead, status_code=201)
def register_user(
    user_in: UserCreate, 
    session: Session = Depends(get_session)
):
    # Проверка на существующего пользователя и создание
    db_user = create_user(session, user_in)
    return db_user