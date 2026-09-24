from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from datetime import timedelta

from app.core.database import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, Token
from app.core.auth import create_access_token, get_current_user
from app.services.auth import verify_password
from app.core.config import settings
from app.crud.user import get_user, create_user

api_router = APIRouter()

@api_router.get("", response_model=UserRead)
def get_cur_user(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.post("/register", response_model=UserRead)
def register(new_user: UserCreate, session: Session = Depends(get_session)):
    existing_user = get_user(session, new_user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = create_user(session, new_user)
    return user

@api_router.post("/login", response_model=Token)
def login(data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = get_user(session, data.username)
    if not user:
        raise HTTPException(status_code=400, detail="User not registered")
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    access_token = create_access_token(data={"sub": user.username}, expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}