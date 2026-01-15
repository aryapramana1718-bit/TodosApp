from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        orm_mode = True

class TodoCreate(BaseModel):
    title: str
    description: str

class TodoOut(BaseModel):
    id: int
    title: str
    description: str
    is_completed: bool

    class Config:
        orm_mode = True
