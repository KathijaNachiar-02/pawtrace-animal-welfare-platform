from fastapi import FastAPI

app = FastAPI(title="PawTrace API")


@app.get("/")
def root():
    return {"message": "PawTrace API is running"}
