from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from app.database import SessionLocal
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError

from app.models import Users
from dotenv import load_dotenv
import os

from app.schemas import UserResponse

load_dotenv()

router = APIRouter(
    prefix='/auth',
    tags = ['auth']
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated = 'auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

class CreateUserRequest(BaseModel):
    email: str
    password: str
    name: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", status_code = status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = Users(
        name = create_user_request.name,
        email = create_user_request.email, 
        hashed_password = bcrypt_context.hash(create_user_request.password)
    )

    db.add(create_user_model)
    db.commit()

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db) #form_data.username takes in email
    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    token = create_access_token(user.email, user.id, timedelta(minutes=20))
    
    return {'access_token': token, 'token_type': 'bearer', 'user_id': user.id}


def authenticate_user(email: str, password: str, db):
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        print(f"No user found with email: {email}")
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': email, 'id': user_id}
    expires = datetime.now() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm= ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get('sub')
        user_id: int = payload.get('id')

        if email is None or user_id is None:
            raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = 'Could not validate user.')
        
        return {'email': email, 'id': user_id}
    
    except JWTError:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail='Could not validate user')
    
@router.get("/me", response_model= UserResponse)
async def read_current_user(user: dict = Depends(get_current_user)):
    return user
