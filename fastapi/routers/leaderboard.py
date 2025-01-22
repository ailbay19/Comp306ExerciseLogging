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
        u.id AS User, 
        u.age AS Age,
        u.gender AS Gender,
        u.weight AS Weight,
        u.height AS Height,
        SUM(p.weight * p.reps * p.sets) AS TotalWeightLifted,
        AVG(p.sets) AS Sets,
        AVG(p.reps) AS Reps
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


@router.get("/top_users_at_certain_exercise2")
def get_top_users_at_certain_exercise2():
    """
    Retrieve id's, fname, lname of users, exercisename of exercise
      and totalWeightLifted for a specific exercise by each user 
      order w.r.t totalweightlifted descending limit by 10
    """
    query = """
SELECT 
    gender_stats.gender,
    gender_stats.user_id,
    gender_stats.fname,
    gender_stats.lname,
    gender_stats.total_workout_duration,
    gender_stats.total_weight_lifted,
    gender_stats.avg_sets,
    gender_stats.avg_reps,
    gender_stats.unique_exercises,
    gender_stats.composite_score
FROM (
    SELECT 
        u.gender,
        u.id AS user_id,
        u.fname,
        u.lname,
        SUM(TIMESTAMPDIFF(MINUTE, w.start_time, w.end_time)) AS total_workout_duration,
        SUM(p.weight) AS total_weight_lifted,
        AVG(p.sets) AS avg_sets,
        AVG(p.reps) AS avg_reps,
        COUNT(DISTINCT p.exercise_name) AS unique_exercises,
        (
            SUM(TIMESTAMPDIFF(MINUTE, w.start_time, w.end_time)) * 
            CASE 
                WHEN u.gender = 'M' THEN 0.35 
                WHEN u.gender = 'F' THEN 0.4 
                ELSE 0.3 
            END +
            SUM(p.weight) * 
            CASE 
                WHEN u.gender = 'M' THEN 0.4 
                WHEN u.gender = 'F' THEN 0.6
                ELSE 0.5
			END +
            AVG(p.reps) * 
            CASE 
                WHEN u.gender = 'M' THEN 100 
                WHEN u.gender = 'F' THEN 80
                ELSE 110
            END +
            COUNT(DISTINCT p.exercise_name) * 
            CASE 
                WHEN MAX(e.level) = 'Intermediate' THEN 15
                WHEN MAX(e.level) = 'Beginner' THEN 10
                ELSE 20
            END
        ) AS composite_score
    FROM 
        User u
    JOIN 
        Workout w ON u.id = w.reg_user_id
    JOIN 
        Performance p ON w.id = p.workout_id
    JOIN
        Exercise e ON p.exercise_name = e.name
    GROUP BY 
        u.gender, u.id, u.fname, u.lname
    HAVING 
        composite_score > 0
) AS gender_stats
ORDER BY 
    gender_stats.composite_score DESC
LIMIT 10;
    """
    new_cursor = get_db()
    db_cursor.execute(query)
    results = db_cursor.fetchall()
    while db_cursor.nextset():
            pass  # Clear remaining results, if any
    return {"top_exercises": results}