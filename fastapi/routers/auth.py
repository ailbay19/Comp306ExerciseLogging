from datetime import date, timedelta
from fastapi import APIRouter, HTTPException
from db import get_db

# Create a router for authentication-related endpoints
router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.post("/register")
def register(id: str, 
             email: str, 
             password: str, 
             fname: str, 
             lname: str, 
             age: int, 
             gender: str, 
             weight: float, 
             height: float, 
             gyms: list[dict]):
    
    query_user = """
    INSERT INTO User (id, email, password, fname, lname, age, gender, weight, height) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    db_cursor.execute(query_user, (id, email, password, fname, lname, age, gender, weight, height))

    query_membership = """
    INSERT INTO Have_Membership_At (user_id, gym_name, gym_location, start_date, due_date) 
    VALUES (%s, %s, %s, %s, %s)
    """

    for gym in gyms:
        gym_name = gym.get("gym_name")
        gym_location = gym.get("gym_location")

        if not gym_name or not gym_location:
            raise HTTPException(
                status_code=400,
                detail="Missing gym_name, gym_location, or due_date in gym membership."
                )
        
         # Automatically set start_date to today and due_date to two years later
        start_date = date.today()
        due_date = start_date + timedelta(days=730)  # 2 years

        db_cursor.execute(query_membership, (id, gym_name, gym_location, start_date, due_date))
    
    db_connection.commit()
    return {"message": "User registered and gym memberships added successfully."}




@router.get("/login")
def login(email: str, password: str):
    query = "SELECT * FROM User WHERE email = %s AND password = %s"
    db_cursor.execute(query, (email, password))
    user = db_cursor.fetchone()
    if user:
        return {"message": "Login successful", "user": user}
    else:
            return {"message": "Invalid mail or password"}

