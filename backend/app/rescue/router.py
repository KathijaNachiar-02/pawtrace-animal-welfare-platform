from typing import List

from fastapi import APIRouter, HTTPException

from .schemas import (
    RescueAssignment,
    RescueCreate,
    RescueResponse,
    RescueUpdate,
)

from .service import (
    assign_volunteer,
    create_rescue,
    get_all_rescues,
    get_rescue_by_id,
    update_rescue,
)


router = APIRouter(
    prefix="/api/rescue",
    tags=["Rescue"],
)


@router.post("/", response_model=RescueResponse)
def create_rescue_endpoint(data: RescueCreate):
    return create_rescue(data)


@router.get("/", response_model=List[RescueResponse])
def get_rescues():
    return get_all_rescues()


@router.get("/{rescue_id}", response_model=RescueResponse)
def get_rescue(rescue_id: int):
    rescue = get_rescue_by_id(rescue_id)

    if rescue is None:
        raise HTTPException(
            status_code=404,
            detail="Rescue record not found",
        )

    return rescue


@router.patch("/{rescue_id}", response_model=RescueResponse)
def update_rescue_endpoint(
    rescue_id: int,
    data: RescueUpdate,
):
    rescue = update_rescue(rescue_id, data)

    if rescue is None:
        raise HTTPException(
            status_code=404,
            detail="Rescue record not found",
        )

    return rescue


@router.post("/{rescue_id}/assign", response_model=RescueResponse)
def assign_rescue_volunteer(
    rescue_id: int,
    data: RescueAssignment,
):
    rescue = assign_volunteer(
        rescue_id,
        data.volunteer_id,
    )

    if rescue is None:
        raise HTTPException(
            status_code=404,
            detail="Rescue record not found",
        )

    return rescue