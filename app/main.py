from fastapi import FastAPI

from app import auth
from . import models, database
from .routes import user, expense
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],  # Allow all headers (including Authorization later)
)

models.Base.metadata.create_all(bind=database.engine) #Create all the table and columns in Postgres


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(expense.router)