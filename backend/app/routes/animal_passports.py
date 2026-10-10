from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.animal import Animal
from app.models.animal_passport import AnimalPassport
from app.schemas.animal_passport import (
    AnimalPassportCreate,
    AnimalPassportResponse,
    AnimalPassportUpdate,
)


router = APIRouter(
    prefix="/api/v1/animal-passports",
    tags=["Animal Digital Passport"],
)


@router.post(
    "/",
    response_model=AnimalPassportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_animal_passport(
    passport_data: AnimalPassportCreate,
    db: Session = Depends(get_db),
):
    animal = db.query(Animal).filter(
        Animal.id == passport_data.animal_id
    ).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found",
        )

    existing_passport = db.query(AnimalPassport).filter(
        AnimalPassport.animal_id == passport_data.animal_id
    ).first()

    if existing_passport is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Digital passport already exists for this animal",
        )

    passport = AnimalPassport(
        animal_id=passport_data.animal_id,
        microchip_id=passport_data.microchip_id,
        identification_markings=passport_data.identification_markings,
        rescue_date=passport_data.rescue_date,
        rescue_location=passport_data.rescue_location,
        current_status=passport_data.current_status,
        notes=passport_data.notes,
    )

    db.add(passport)
    db.commit()
    db.refresh(passport)

    return passport


@router.get(
    "/animal/{animal_id}",
    response_model=AnimalPassportResponse,
)
def get_animal_passport(
    animal_id: UUID,
    db: Session = Depends(get_db),
):
    passport = db.query(AnimalPassport).filter(
        AnimalPassport.animal_id == animal_id
    ).first()

    if passport is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Digital passport not found",
        )

    return passport


@router.put(
    "/animal/{animal_id}",
    response_model=AnimalPassportResponse,
)
def update_animal_passport(
    animal_id: UUID,
    passport_data: AnimalPassportUpdate,
    db: Session = Depends(get_db),
):
    passport = db.query(AnimalPassport).filter(
        AnimalPassport.animal_id == animal_id
    ).first()

    if passport is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Digital passport not found",
        )

    update_data = passport_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(passport, field, value)

    db.commit()
    db.refresh(passport)

    return passport


@router.delete(
    "/animal/{animal_id}",
)
def delete_animal_passport(
    animal_id: UUID,
    db: Session = Depends(get_db),
):
    passport = db.query(AnimalPassport).filter(
        AnimalPassport.animal_id == animal_id
    ).first()

    if passport is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Digital passport not found",
        )

    db.delete(passport)
    db.commit()

    return {
        "message": "Digital passport deleted successfully",
        "animal_id": animal_id,
    }