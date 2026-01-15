from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import SessionLocal


router = APIRouter(tags=["Todos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    new_todo = models.Todo(**todo.dict(), user_id=1)
    db.add(new_todo)
    db.commit()
    return {"message": "Todo created"}

@router.get("/")
def get_todos(db: Session = Depends(get_db)):
    return db.query(models.Todo).all()

@router.delete("/{id}")
def delete_todo(id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    db.delete(todo)
    db.commit()
    return {"message": "Deleted"}
@router.put("/{id}")
def update_todo(id: int, updated_todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    todo.title = updated_todo.title
    todo.description = updated_todo.description
    db.commit()
    return {"message": "Updated"}