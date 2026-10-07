from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ReportCreate(BaseModel):
    reporter_id: UUID
    animal_id: UUID | None = None
    report_type: str
    description: str
    location: str


class ReportResponse(BaseModel):
    id: UUID
    reporter_id: UUID
    animal_id: UUID | None
    report_type: str
    description: str
    location: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)