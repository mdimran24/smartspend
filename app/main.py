from fastapi import FastAPI

from app import auth
from . import models, database
from .routes import user, expense

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine) #Create all the table and columns in Postgres


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(expense.router)