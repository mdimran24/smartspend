from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, false
from .database import Base

class Expenses(Base):
    __tablename__ = 'expenses'
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String, index = True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=false)
    category = Column(String)
    date = Column(DateTime(timezone=True), nullable = False)


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)


