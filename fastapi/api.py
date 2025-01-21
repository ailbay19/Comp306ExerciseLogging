from http.client import HTTPException
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

import mysql.connector

import random

db_connection = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="123", 
  auth_plugin='mysql_native_password',
)

print(db_connection)

db_cursor = db_connection.cursor(buffered=True)
db_cursor.execute("USE fitness_tracker_db")

# Create an instance of FastAPI
app = FastAPI()

app.mount("/app", StaticFiles(directory="../frontend"), name="frontend")

# Endpoint for register 
@app.post("/register")
async def register(request: Request):
    data = await request.json()

    id = "U" + str(random.randint(1000000,9999999)) # TODO: fix this
    email = data["email"]
    password = data["password"]
    fname = data["fname"]
    lname = data["lname"]
    age = data["age"]
    gender = "M" if data["gender"] == "Male" else "F"
    weight = data["weight"]
    height = data["height"]
    
    query = """
    INSERT INTO User (id, email, password, fname, lname, age, gender, weight, height) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    db_cursor.execute(query, (id, email, password, fname, lname, age, gender, weight, height))
    db_connection.commit()
    return login(email, password)

# Endpoint for login 
@app.get("/login")
def login(email: str, password: str):
    query = "SELECT * FROM User WHERE email = %s AND password = %s"
    db_cursor.execute(query, (email, password))
    user = db_cursor.fetchone()
    if user:
        return {"message": "Login successful", "user": map_db_user_to_json(user)}
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


def map_db_user_to_json(user):
    user_data = {
            "id": user[0],
            "email": user[1],
            "password": user[2],
            "fname": user[3],
            "lname": user[4],
            "age": user[5],
            "gender": user[6],
            "weight": user[7],
            "height": user[8],
        }
    return user_data