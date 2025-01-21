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
