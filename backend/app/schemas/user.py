from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    email: str
    full_name: str
    phone: str | None = None
    role: str = "CITIZEN"


class UserUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None


class UserResponse(BaseModel):
    id: UUID
    keycloak_id: str | None
    email: str
    full_name: str
    phone: str | None
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
