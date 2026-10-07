from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models.animal import Animal
from app.models.report import Report
from app.models.report_photo import ReportPhoto
from app.models.user import User
from app.routes.animals import router as animals_router
from app.routes.reports import router as reports_router
from app.routes.users import router as users_router

app = FastAPI(
    title="PawTrace API",
    description="Backend API for the PawTrace animal welfare platform",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(animals_router)
app.include_router(reports_router)
app.include_router(users_router)


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