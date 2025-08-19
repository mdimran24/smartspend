from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import auth
from .. import database, models
from ..schemas import UserBase

router = APIRouter(
    prefix='/users',
    tags = ['users']
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(auth.get_current_user)]

@router.post("/users")
async def register_user(user: UserBase, db:db_dependency):
    db_user = models.Users(name = user.name, email = user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users")
async def get_users(db:db_dependency):
    return db.query(models.Users).all()
    # if not result:
    #     raise HTTPException(status_code=404, detail="Not found")
    # return result

@router.get("/user", status_code= status.HTTP_200_OK)
async def authenticate_user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code = 401, detail = 'Authentication Failed')
    return {"User" : user}