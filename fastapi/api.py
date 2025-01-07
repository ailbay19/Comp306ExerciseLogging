from fastapi import FastAPI

import mysql.connector

db_connection = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="123", 
  auth_plugin='mysql_native_password'
)
print(db_connection)

db_cursor = db_connection.cursor(buffered=True)
db_cursor.execute("USE fitness_tracker_db")

# Create an instance of FastAPI
app = FastAPI()


# Define a route (endpoint) for the root path
@app.get("/")
def read_root():
    query = "SELECT * FROM Gym"
    
    
    db_cursor.execute(query)
    return db_cursor.fetchall()
