from fastapi import APIRouter, HTTPException
from db import get_db

# Create a router for user-related endpoints
router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.get("/user/{user_id}")
def get_user(user_id: str):
    query = "SELECT * FROM User WHERE id = %s"
    db_cursor.execute(query, (user_id,))
    user = db_cursor.fetchone()
    if user:
        return {"user": user}
    else:
        raise HTTPException(status_code=404, detail="User not found")
