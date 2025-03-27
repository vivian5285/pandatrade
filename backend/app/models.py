from pydantic import BaseModel
from typing import Optional

class Strategy(BaseModel):
    name: str
    parameters: dict
    historical_data: dict 