from fastapi import FastAPI

from app.rescue.router import router as rescue_router


app = FastAPI(title="PawTrace API")


app.include_router(rescue_router)


@app.get("/")
def root():
    return {"message": "PawTrace API is running"}