from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ReportCreate(BaseModel):
    """
    Data submitted by the citizen.

    The citizen does NOT provide:
    - id
    - report_number
    - animal_id
    - status

    These are generated/managed by the backend.
    """

    reporter_id: UUID
    report_type: str
    description: str
    location: str


class ReportResponse(BaseModel):
    """
    Data returned to the frontend.
    """

    # Internal database UUID
    id: UUID

    # Human-readable Report ID
    # Example: RPT-2026-000001
    report_number: str

    reporter_id: UUID

    # NULL until NGO verification
    animal_id: UUID | None

    report_type: str
    description: str
    location: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)