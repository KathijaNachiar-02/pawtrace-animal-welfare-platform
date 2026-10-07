from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AnimalCreate(BaseModel):
    name: str | None = None
    species: str
    breed: str | None = None
    sex: str | None = None
    color: str | None = None
    description: str | None = None


class AnimalUpdate(BaseModel):
    name: str | None = None
    species: str | None = None
    breed: str | None = None
    sex: str | None = None
    color: str | None = None
    description: str | None = None
    status: str | None = None


class AnimalResponse(BaseModel):
    id: UUID
    name: str | None
    species: str
    breed: str | None
    sex: str | None
    color: str | None
    description: str | None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)