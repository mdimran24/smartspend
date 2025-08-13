from fastapi import FastAPI
from . import models, database
from .routes import user


models.Base.metadata.create_all(bind=database.engine) #Create all the table and columns in Postgres

app = FastAPI()
app.include_router(user.router)

