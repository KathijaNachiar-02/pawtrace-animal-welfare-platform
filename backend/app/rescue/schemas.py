from enum import Enum
from pydantic import BaseModel
from typing import Optional


class RescuePriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    EMERGENCY = "EMERGENCY"


class RescueStatus(str, Enum):
    AWAITING_ASSIGNMENT = "AWAITING_ASSIGNMENT"
    ASSIGNED = "ASSIGNED"
    RESCUE_IN_PROGRESS = "RESCUE_IN_PROGRESS"
    RESCUED = "RESCUED"
    TREATMENT = "TREATMENT"
    FOSTER = "FOSTER"
    RESOLVED = "RESOLVED"


class RescueCreate(BaseModel):
    animal_id: int
    location: str
    description: str
    priority: RescuePriority = RescuePriority.MEDIUM


class RescueUpdate(BaseModel):
    status: Optional[RescueStatus] = None
    priority: Optional[RescuePriority] = None
    description: Optional[str] = None


class RescueResponse(BaseModel):
    id: int
    animal_id: int
    location: str
    description: str
    priority: RescuePriority
    status: RescueStatus
    assigned_volunteer_id: Optional[int] = None

class RescueAssignment(BaseModel):
    volunteer_id: int