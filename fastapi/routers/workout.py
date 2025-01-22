from datetime import datetime, date, time, timedelta
import uuid
from fastapi import APIRouter
from db import get_db

router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.post("/start_workout")
def start_workout(
    reg_user_id: str,
    gym_name: str,
    gym_location: str,
    trainer_id,
    exercises: list[dict]  # List of performance data
):
    """
    Start a workout and log performance.
    - reg_user_id: Registered user's ID.
    - gym_name: Name of the gym where the workout is taking place.
    - gym_location: Location of the gym.
    - trainer_id: Personal trainer ID.
    - exercises: List of dictionaries containing performance data (the exercise detail part of frontend corresponds here).
    """
    if exercises is None:
        exercises = []

    # Generate a unique workout ID
    workout_id = f"W{uuid.uuid4().hex[:7]}"  # Ensure ID is 8 characters including 'W'
    
    # Insert a new workout
    start_time = datetime.now().time()  # Current time as start time
    end_time = (datetime.combine(date.today(), start_time) + timedelta(hours=2)).time()  # 2 hours after start_time
    
    workout_query = """
        INSERT INTO Workout (id, date, start_time, end_time, gym_name, trainer_id, reg_user_id, gym_location)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    db_cursor.execute(
        workout_query,
        (workout_id, date.today(), start_time, end_time, gym_name, trainer_id, reg_user_id, gym_location)
    )
    
    # Insert performance data
    performance_query = """
        INSERT INTO Performance (id, weight, sets, reps, workout_id, exercise_name)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    for exercise in exercises:
        performance_id = f"P{uuid.uuid4().hex[:7]}"  # Ensure ID is 8 characters including 'P'
        db_cursor.execute(
            performance_query,
            (
                performance_id,
                exercise.get("weight", 0.0),
                exercise.get("sets", 0),
                exercise.get("reps", 0),
                workout_id,
                exercise.get("exercise_name")
            )
        )

    # Commit changes
    db_connection.commit()

    return {"message": "Workout started successfully", "workout_id": workout_id}
