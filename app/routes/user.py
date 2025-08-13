from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models
from ..schemas import UserBase

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users")
async def register_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.User(name = user.name, email = user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users")
async def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()
    # if not result:
    #     raise HTTPException(status_code=404, detail="Not found")
    # return result