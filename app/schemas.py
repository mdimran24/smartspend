from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel

class UserBase(BaseModel):
    id: Optional[UUID] = uuid4
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class ExpenseBase(BaseModel):
    id: Optional[UUID] = uuid4
    name: str
    amount: float
    category: str
    date: datetime

class ExpenseCreate(ExpenseBase):
    id: int

class ExpenseResponse(ExpenseBase):
    id: int
    name: str
    amount: float
    category: str
    date: datetime
    user_id: int

    class Config:
        orm_mode = True

class ExpenseUpdateRequest(BaseModel):
    name: Optional[str]
    amount: Optional[float]
    category: Optional[str]
    date: Optional[datetime]

