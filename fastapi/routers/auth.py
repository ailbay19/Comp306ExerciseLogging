from fastapi import APIRouter, HTTPException
from db import get_db

# Create a router for authentication-related endpoints
router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.post("/register")
def register(id: str, email: str, password: str, fname: str, lname: str, age: int, gender: str, weight: float, height: float):
    query = """
    INSERT INTO User (id, email, password, fname, lname, age, gender, weight, height) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    db_cursor.execute(query, (id, email, password, fname, lname, age, gender, weight, height))
    db_connection.commit()
    return {"message": "User registered successfully"}



@router.get("/login")
def login(email: str, password: str):
    query = "SELECT * FROM User WHERE email = %s AND password = %s"
    db_cursor.execute(query, (email, password))
    user = db_cursor.fetchone()
    if user:
        return {"message": "Login successful", "user": user}
    else:
            return {"message": "Invalid mail or password"}

