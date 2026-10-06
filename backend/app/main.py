from fastapi import FastAPI

from app.db.database import Base, engine
from app.models.animal import Animal
from app.models.report import Report
from app.models.user import User
from app.routes.reports import router as reports_router

app = FastAPI(
    title="PawTrace API",
    description="Backend API for the PawTrace animal welfare platform",
    version="1.0.0",
)
app.include_router(reports_router)

@app.get("/")
def root():
    return {"message": "PawTrace API is running"}


@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/v1/database/init")
def initialize_database():
    Base.metadata.create_all(bind=engine)

    return {
        "message": "Database tables initialized successfully",
        "tables": list(Base.metadata.tables.keys()),
    }