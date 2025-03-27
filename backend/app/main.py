from fastapi import FastAPI
from app.routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "量化分析平台"} 