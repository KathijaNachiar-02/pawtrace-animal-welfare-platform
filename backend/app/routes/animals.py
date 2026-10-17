from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.animal import Animal
from app.schemas.animal import AnimalCreate, AnimalResponse, AnimalUpdate


router = APIRouter(
    prefix="/api/v1/animals",
    tags=["Animals"],
)


@router.post(
    "/",
    response_model=AnimalResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_animal(
    animal_data: AnimalCreate,
    db: Session = Depends(get_db),
):
    animal = Animal(
        name=animal_data.name,
        species=animal_data.species,
        breed=animal_data.breed,
        sex=animal_data.sex,
        color=animal_data.color,
        description=animal_data.description,
    )

    db.add(animal)
    db.commit()
    db.refresh(animal)

    return animal


@router.get(
    "/",
    response_model=list[AnimalResponse],
)
def get_animals(
    db: Session = Depends(get_db),
):
    return db.query(Animal).all()


@router.get(
    "/{animal_id}",
    response_model=AnimalResponse,
)
def get_animal(
    animal_id: UUID,
    db: Session = Depends(get_db),
):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found",
        )

    return animal


@router.put(
    "/{animal_id}",
    response_model=AnimalResponse,
)
def update_animal(
    animal_id: UUID,
    animal_data: AnimalUpdate,
    db: Session = Depends(get_db),
):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found",
        )

    update_data = animal_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(animal, field, value)

    db.commit()
    db.refresh(animal)

    return animal


@router.delete(
    "/{animal_id}",
)
def delete_animal(
    animal_id: UUID,
    db: Session = Depends(get_db),
):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()

    if animal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Animal not found",
        )

    db.delete(animal)
    db.commit()

    return {
        "message": "Animal deleted successfully",
        "animal_id": animal_id,
    }