from fastapi import APIRouter, Query
from db import get_db

router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.get("/top_users_at_certain_exercise")
def get_top_users_at_certain_exercise(exercise_name: str):
    """
    Retrieve id's, fname, lname of users, exercisename of exercise
      and totalWeightLifted for a specific exercise by each user 
      order w.r.t totalweightlifted descending limit by 10
    """
    query = """
        SELECT 
            u.id AS UserID,
            u.fname,
            u.lname,
            e.name AS ExerciseName,
            SUM(p.weight * p.reps * p.sets) AS TotalWeightLifted
        FROM 
            Performance p
        JOIN
            Workout w ON w.id = p.workout_id
        JOIN 
            Exercise e ON p.exercise_name = e.name
        JOIN 
            User u ON u.id = w.reg_user_id
        WHERE 
            e.name = %s
        GROUP BY 
            u.id, u.fname, u.lname, e.name
        ORDER BY 
            TotalWeightLifted DESC
        LIMIT 10;
    """
    db_cursor.execute(query, (exercise_name,))
    results = db_cursor.fetchall()
    return {"exercise_name": exercise_name, "top_exercises": results}