from fastapi import Depends, FastAPI
from app.db.database import Base, engine
from app.models.animal import Animal
from app.models.animal_passport import AnimalPassport
from app.models.report import Report
from app.models.user import User
from app.routes.animal_passports import router as animal_passports_router
from app.routes.animals import router as animals_router
from app.routes.reports import router as reports_router
from app.routes.users import router as users_router
from app.core.security import get_current_user

app = FastAPI(
    title="PawTrace API",
    description="Backend API for the PawTrace animal welfare platform",
    version="1.0.0",
)


app.include_router(animals_router)
app.include_router(animal_passports_router)
app.include_router(reports_router)
app.include_router(users_router)


@app.get("/")
def root():
    return {"message": "PawTrace API is running"}


@app.get("/api/v1/health")
def health_check(current_user: dict = Depends(get_current_user)):
    return {
        "status": "healthy",
        "user": current_user.get("preferred_username"),
    }


@app.post("/api/v1/database/init")
def initialize_database():
    Base.metadata.create_all(bind=engine)

    return {
        "message": "Database tables initialized successfully",
        "tables": list(Base.metadata.tables.keys()),
    }