from http.client import HTTPException
from fastapi import FastAPI

import mysql.connector

db_connection = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="sultansevan2005", 
  auth_plugin='mysql_native_password'
)

print(db_connection)

db_cursor = db_connection.cursor(buffered=True)
db_cursor.execute("USE fitness_tracker_db")

# Create an instance of FastAPI
app = FastAPI()


# Endpoint for register 
@app.post("/register")
def register(id: str, email: str, password: str, fname: str, lname: str, age: int, gender: str, weight: float, height: float):
    
    query = """
    INSERT INTO User (id, email, password, fname, lname, age, gender, weight, height) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    db_cursor.execute(query, (id, email, password, fname, lname, age, gender, weight, height))
    db_connection.commit()
    return {"message": "User registered successfully"}

# Endpoint for login 
@app.get("/login")
def login(email: str, password: str):
    query = "SELECT * FROM User WHERE email = %s AND password = %s"
    db_cursor.execute(query, (email, password))
    user = db_cursor.fetchone()
    if user:
        return {"message": "Login successful", "user": user}
    else:
        return {"message": "Invalid email or password."}
    
# Endpoint to get user details by ID 
@app.get("/user/{user_id}")
def get_user(user_id: str):
    query = "SELECT * FROM User WHERE id = %s"
    db_cursor.execute(query, (user_id,))
    user = db_cursor.fetchone()
    if user:
        return {"user": user}
    else:
        raise HTTPException(status_code=404, detail="User not found")


