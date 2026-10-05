from typing import List, Optional

from .schemas import (
    RescueCreate,
    RescueResponse,
    RescueStatus,
    RescueUpdate,
)


# Temporary in-memory storage.
# This will later be replaced with the real database.
rescues: List[RescueResponse] = []

_next_rescue_id = 1


def create_rescue(data: RescueCreate) -> RescueResponse:
    global _next_rescue_id

    rescue = RescueResponse(
        id=_next_rescue_id,
        animal_id=data.animal_id,
        location=data.location,
        description=data.description,
        priority=data.priority,
        status=RescueStatus.AWAITING_ASSIGNMENT,
    )

    rescues.append(rescue)
    _next_rescue_id += 1

    return rescue


def get_all_rescues() -> List[RescueResponse]:
    return rescues


def get_rescue_by_id(rescue_id: int) -> Optional[RescueResponse]:
    for rescue in rescues:
        if rescue.id == rescue_id:
            return rescue

    return None


def update_rescue(
    rescue_id: int,
    data: RescueUpdate,
) -> Optional[RescueResponse]:

    rescue = get_rescue_by_id(rescue_id)

    if rescue is None:
        return None

    if data.status is not None:
        rescue.status = data.status

    if data.priority is not None:
        rescue.priority = data.priority

    if data.description is not None:
        rescue.description = data.description

    return rescue


def assign_volunteer(
    rescue_id: int,
    volunteer_id: int,
) -> Optional[RescueResponse]:

    rescue = get_rescue_by_id(rescue_id)

    if rescue is None:
        return None

    rescue.assigned_volunteer_id = volunteer_id
    rescue.status = RescueStatus.ASSIGNED

    return rescue