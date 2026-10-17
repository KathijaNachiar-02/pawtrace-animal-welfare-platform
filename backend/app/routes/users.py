
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.services.keycloak import (
    create_keycloak_user,
    delete_keycloak_user,
)


router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"],
)


@router.post("/", response_model=UserResponse, status_code=201)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    email = str(user.email)

    # Check whether a profile with this email already exists.
    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=409,
            detail="A user with this email already exists.",
        )

    # Create the identity account in Keycloak.
    try:
        keycloak_id = create_keycloak_user(
            email=email,
            full_name=user.full_name,
            password=user.password,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=409,
            detail=str(exc),
        ) from exc
    except RuntimeError as exc:
        raise HTTPException(
            status_code=502,
            detail="Could not create the account with the identity service.",
        ) from exc

    # Public registration always creates a citizen account.
    new_user = User(
        keycloak_id=keycloak_id,
        email=email,
        full_name=user.full_name,
        phone=user.phone,
        role="CITIZEN",
    )

    # Save the profile in the application database.
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as exc:
        db.rollback()

        # If the database save fails, try to remove the Keycloak account.
        try:
            delete_keycloak_user(keycloak_id)
        except Exception as cleanup_exc:
            # Log the failure without exposing credentials or tokens.
            import logging

            logging.getLogger(__name__).error(
                "Registration rollback cleanup failed for a Keycloak user."
            )

            raise HTTPException(
                status_code=500,
                detail=(
                    "Saving the profile failed and account cleanup "
                    "could not be confirmed. Please contact support."
                ),
            ) from exc

        raise HTTPException(
            status_code=500,
            detail=(
                "Saving the profile failed. The new identity account "
                "was cleaned up; please try again."
            ),
        ) from exc

    return new_user
