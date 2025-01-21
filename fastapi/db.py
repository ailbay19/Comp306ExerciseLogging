import mysql.connector

# Configuration of database connection
db_connection = mysql.connector.connect(
    host="localhost",
    port="3322",
    user="root",
    passwd="sultansevan2005_",
    auth_plugin='mysql_native_password'
)

db_cursor = db_connection.cursor(buffered=True)
db_cursor.execute("USE fitness_tracker_db")

print(db_connection);

# Exporting connection and cursor for use in other modules
def get_db():
    return db_connection, db_cursor
