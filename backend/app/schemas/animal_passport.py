from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AnimalPassportCreate(BaseModel):
    animal_id: UUID
    microchip_id: str | None = None
    identification_markings: str | None = None
    rescue_date: datetime | None = None
    rescue_location: str | None = None
    current_status: str | None = None
    notes: str | None = None


class AnimalPassportUpdate(BaseModel):
    microchip_id: str | None = None
    identification_markings: str | None = None
    rescue_date: datetime | None = None
    rescue_location: str | None = None
    current_status: str | None = None
    notes: str | None = None


class AnimalPassportResponse(BaseModel):
    id: UUID
    animal_id: UUID
    microchip_id: str | None
    identification_markings: str | None
    rescue_date: datetime | None
    rescue_location: str | None
    current_status: str | None
    notes: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)