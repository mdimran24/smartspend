from math import exp
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import auth
from .. import database, models
from ..schemas import ExpenseBase, ExpenseUpdateRequest, UserBase
from app import schemas

router = APIRouter(
    tags = ['expenses']
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(auth.get_current_user)]

@router.post("/expenses", response_model= schemas.ExpenseResponse)
async def create_expense(expense: ExpenseBase, db:db_dependency, user: user_dependency):
    db_expense = models.Expenses(
        name = expense.name,
        amount = expense.amount,
        user_id = user["id"],
        category = expense.category,
        date = expense.date
        )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@router.get("/expenses", response_model= list[schemas.ExpenseResponse])
async def get_expenses(db:db_dependency, user: (user_dependency)):
    return db.query(models.Expenses).filter(models.Expenses.user_id == user["id"]).all()


@router.put("/expenses")
async def update_expense(db: db_dependency, user: user_dependency, updatedExpense : ExpenseUpdateRequest, expense_id: int):
    expense = db.query(models.Expenses).filter(models.Expenses.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    for key, value in updatedExpense.model_dump(exclude_unset=True).items():
        setattr(expense, key, value)
    
    db.commit()
    db.refresh(expense)
    return expense

@router.delete("/expenses")
async def delete_expense(db: db_dependency, expense_id: int, user: user_dependency):
    expense = db.query(models.Expenses).filter(
        models.Expenses.id == expense_id,
        models.Expenses.user_id == user["id"]
    ).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(expense)
    db.commit()
    return expense
        
