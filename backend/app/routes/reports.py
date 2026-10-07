from datetime import datetime
from pathlib import Path
from uuid import UUID, uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.minio_client import minio_client
from app.db.database import get_db
from app.models.report import Report
from app.models.report_photo import ReportPhoto
from app.schemas.report import ReportCreate, ReportResponse


router = APIRouter(
    prefix="/api/v1/reports",
    tags=["Reports"],
)


# =========================================================
# GENERATE HUMAN-READABLE REPORT NUMBER
# =========================================================

def generate_report_number(db: Session) -> str:
    """
    Generate a concurrency-safe, human-readable Report ID.

    PostgreSQL sequence is used for the numeric part.

    Examples:
        RPT-2026-000001
        RPT-2026-000002
        RPT-2026-000003

    The PostgreSQL sequence guarantees that two simultaneous
    requests do not generate the same number.
    """

    year = datetime.utcnow().year

    next_number = db.execute(
        text("SELECT nextval('report_number_seq')")
    ).scalar_one()

    return f"RPT-{year}-{next_number:06d}"


# =========================================================
# CREATE REPORT
# =========================================================

@router.post(
    "/",
    response_model=ReportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new animal welfare report submitted by a citizen.

    Workflow:

    Citizen submits report
        ↓
    PostgreSQL generates internal UUID
        ↓
    PostgreSQL sequence generates Report Number
        ↓
    Example: RPT-2026-000003
        ↓
    animal_id = NULL
        ↓
    status = PENDING
        ↓
    NGO verifies later
    """

    # Generate concurrency-safe human-readable Report ID
    report_number = generate_report_number(db)

    new_report = Report(
        report_number=report_number,
        reporter_id=report.reporter_id,
        animal_id=None,
        report_type=report.report_type,
        description=report.description,
        location=report.location,
        status="PENDING",
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


# =========================================================
# GET ALL REPORTS
# =========================================================

@router.get(
    "/",
    response_model=list[ReportResponse],
)
def get_reports(
    db: Session = Depends(get_db),
):
    """
    Get all reports.

    Reports are returned from newest to oldest.
    """

    reports = (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .all()
    )

    return reports


# =========================================================
# GET SINGLE REPORT
# =========================================================

@router.get(
    "/{report_id}",
    response_model=ReportResponse,
)
def get_report(
    report_id: UUID,
    db: Session = Depends(get_db),
):
    """
    Get a single report using its internal UUID.
    """

    report = (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )

    return report


# =========================================================
# DELETE REPORT
# =========================================================

@router.delete(
    "/{report_id}",
)
def delete_report(
    report_id: UUID,
    db: Session = Depends(get_db),
):
    """
    Delete a report.

    Mainly useful during development/testing.

    In the final production system, reports may instead
    be archived rather than permanently deleted.
    """

    report = (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )

    db.delete(report)
    db.commit()

    return {
        "message": "Report deleted successfully",
        "report_id": report_id,
    }


# =========================================================
# UPLOAD REPORT PHOTO
# =========================================================

@router.post(
    "/{report_id}/photo",
    status_code=status.HTTP_201_CREATED,
)
def upload_report_photo(
    report_id: UUID,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a photo for an existing animal welfare report.

    Workflow:

    Report already exists
        ↓
    Validate report
        ↓
    Validate image type
        ↓
    Upload image to MinIO
        ↓
    Save photo information in PostgreSQL
    """

    # -----------------------------------------------------
    # Check that the report exists
    # -----------------------------------------------------

    report = (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )

    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )

    # -----------------------------------------------------
    # Validate image type
    # -----------------------------------------------------

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if photo.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG, and WebP images are allowed",
        )

    # -----------------------------------------------------
    # Get file extension
    # -----------------------------------------------------

    extension = Path(photo.filename or "").suffix.lower()

    if not extension:
        if photo.content_type == "image/jpeg":
            extension = ".jpg"
        elif photo.content_type == "image/png":
            extension = ".png"
        else:
            extension = ".webp"

    # -----------------------------------------------------
    # Generate unique MinIO object key
    # -----------------------------------------------------

    object_key = f"reports/{report_id}/{uuid4()}{extension}"

    # -----------------------------------------------------
    # Upload image to MinIO
    # -----------------------------------------------------

    try:
        # Move to the end of the file to determine its size
        photo.file.seek(0, 2)
        file_size = photo.file.tell()

        # Return to the beginning before uploading
        photo.file.seek(0)

        minio_client.put_object(
            settings.minio_bucket,
            object_key,
            photo.file,
            length=file_size,
            content_type=photo.content_type,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Photo upload failed: {exc}",
        )

    # -----------------------------------------------------
    # Save photo metadata in PostgreSQL
    # -----------------------------------------------------

    report_photo = ReportPhoto(
        report_id=report_id,
        object_key=object_key,
        original_filename=photo.filename or "photo",
        content_type=photo.content_type,
    )

    db.add(report_photo)
    db.commit()
    db.refresh(report_photo)

    # -----------------------------------------------------
    # Return photo information
    # -----------------------------------------------------

    return {
        "id": report_photo.id,
        "report_id": report_photo.report_id,
        "object_key": report_photo.object_key,
        "original_filename": report_photo.original_filename,
        "content_type": report_photo.content_type,
        "created_at": report_photo.created_at,
    }