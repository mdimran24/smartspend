from sqlalchemy import Column, Integer, String
from .database import Base

# class Expenses(Base):
#     __tablename__ = 'Expenses'
#     id = Column(Integer, primary_key=True, index = True)
#     name = Column(String, index = True)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)