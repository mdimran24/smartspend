from sqlalchemy import Column, Float, Integer, String, false
from .database import Base

class Expenses(Base):
    __tablename__ = 'Expenses'
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String, index = True)
    user_id = Column(Integer, foreign_key=id, index=True)
    amount = Column(Float, nullable=false)
    category = Column(String)
    description = Column(String, nullable=True)


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)


