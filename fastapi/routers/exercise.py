from fastapi import APIRouter, Query
from typing import Optional
from db import get_db

router = APIRouter()

# Get database connection and cursor
db_connection, db_cursor = get_db()

@router.get("/filter_exercises")
def filter_exercises(
    target_muscle: Optional[str] = Query(None, description="Target muscle to filter by"),
    level: Optional[str] = Query(None, description="Difficulty level to filter by"),
    equipment: Optional[str] = Query(None, description="Equipment type to filter by"),
):
    """
    Filter exercises based on target muscle, level, and equipment.
    - Any of the parameters can be omitted to include all options.
    """
    query = """
    SELECT E.name, E.level, E.required_equipment, T.muscle 
    FROM Exercise AS E
    JOIN Target_muscle AS T ON E.name = T.exercise_name
    WHERE 1=1
    """
    filters = []

    if target_muscle and target_muscle != "All Muscles":
        query += " AND T.muscle = %s"
        filters.append(target_muscle)

    if level and level != "All Levels":
        query += " AND E.level = %s"
        filters.append(level)

    if equipment and equipment != "All Equipment":
        query += " AND E.required_equipment = %s"
        filters.append(equipment)

    db_cursor.execute(query, tuple(filters))
    exercises = db_cursor.fetchall()

    # Convert the result to a list of dictionaries
    result = [
        {
            "name": row[0],
            "level": row[1],
            "equipment": row[2],
            "target_muscle": row[3],
        }
        for row in exercises
    ]

    return {"exercises": result}


@router.get("/exercises/multi_muscle")
def get_exercises_targeting_multiple_muscles():
    """
    Get exercises that primarily target more than one muscle group.
    - Returns exercises along with the count of targeted muscle groups.
    - Ordered by the number of muscle groups in descending order.
    """
    try:
        query = """
            SELECT 
                e.name AS ExerciseName,
                COUNT(tm.muscle) AS TargetedMuscles
            FROM 
                Exercise e
            JOIN 
                Target_Muscle tm ON e.name = tm.exercise_name
            GROUP BY 
                e.name
            HAVING 
                COUNT(tm.muscle) > 1
            ORDER BY 
                COUNT(tm.muscle) DESC;
        """
        db_cursor.execute(query)
        result = db_cursor.fetchall()

        if result:
            return {"exercises": result}
        else:
            return {"message": "No exercises target more than one muscle group."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving exercises: {str(e)}")
    
@router.get("/top_exercises_by_level")
def get_top_exercises_by_level(level: str):
    """
    Retrieve the top 10 exercises based on the number of distinct users who performed them,
    filtered by the specified level ('Beginner', 'Intermediate', 'Advanced').
    """
    query = """
    SELECT 
        e.name AS ExerciseName, 
        user_counts.UserCount
    FROM 
        Exercise e
    JOIN 
        (
            SELECT 
                p.exercise_name AS ExerciseName, 
                COUNT(DISTINCT w.reg_user_id) AS UserCount
            FROM 
                Performance p
            JOIN 
                Workout w ON p.workout_id = w.id
            JOIN 
                Exercise ex ON p.exercise_name = ex.name
            WHERE 
                ex.level = %s
            GROUP BY 
                p.exercise_name
        ) user_counts ON e.name = user_counts.ExerciseName
    ORDER BY 
        user_counts.UserCount DESC
    LIMIT 10;
    """
    db_cursor.execute(query, (level,))
    results = db_cursor.fetchall()
    return {"level": level, "top_exercises": results}
