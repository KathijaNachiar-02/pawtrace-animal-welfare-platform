from fastapi import FastAPI

app = FastAPI(
    title="PawTrace API",
    description="Backend API for the PawTrace animal welfare platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "PawTrace API is running"}


@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}
