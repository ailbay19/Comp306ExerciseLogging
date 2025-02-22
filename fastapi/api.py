from fastapi import FastAPI
from routers import auth, user, exercise, workout, leaderboard # Import routers
from fastapi.staticfiles import StaticFiles

# Create an instance of FastAPI
app = FastAPI()

# Include frontend
app.mount("/app", StaticFiles(directory="../frontend"), name="frontend")

# Include routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(user.router, tags=["User Management"])
app.include_router(exercise.router, tags=["Exercise Filtering / Exercise Infographics"])
app.include_router(workout.router, tags=["Performing/Starting Workout"])
app.include_router(leaderboard.router, tags=["Some User Leaderboards"])


