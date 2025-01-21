from fastapi import FastAPI
from routers import auth, user, exercise  # Import routers

# Create an instance of FastAPI
app = FastAPI()


# Include routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(user.router, tags=["User Management"])
app.include_router(exercise.router, tags=["Exercise Filtering / Exercise Infographics"])
