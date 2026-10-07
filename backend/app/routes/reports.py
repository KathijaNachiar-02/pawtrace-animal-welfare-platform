from datetime import datetime
from pathlib import Path
from uuid import UUID, uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Response,
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


def generate_report_number(db: Session) -> str:
    year = datetime.utcnow().year

    next_number = db.execute(
        text("SELECT nextval('report_number_seq')")
    ).scalar_one()

    return f"RPT-{year}-{next_number:06d}"


# ============================================================
# CREATE REPORT
# ============================================================

@router.post(
    "/",
    response_model=ReportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
):
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


# ============================================================
# GET ALL REPORTS
# ============================================================

@router.get(
    "/",
    response_model=list[ReportResponse],
)
def get_reports(
    db: Session = Depends(get_db),
):
    reports = (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .all()
    )

    return reports


# ============================================================
# GET SINGLE REPORT
# ============================================================

@router.get(
    "/{report_id}",
    response_model=ReportResponse,
)
def get_report(
    report_id: UUID,
    db: Session = Depends(get_db),
):
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


# ============================================================
# DELETE REPORT
# ============================================================

@router.delete(
    "/{report_id}",
)
def delete_report(
    report_id: UUID,
    db: Session = Depends(get_db),
):
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


# ============================================================
# UPLOAD REPORT PHOTO
# ============================================================

@router.post(
    "/{report_id}/photo",
    status_code=status.HTTP_201_CREATED,
)
def upload_report_photo(
    report_id: UUID,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # --------------------------------------------------------
    # Check that the report exists
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Validate file type
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Determine file extension
    # --------------------------------------------------------

    extension = Path(
        photo.filename or ""
    ).suffix.lower()

    if not extension:
        if photo.content_type == "image/jpeg":
            extension = ".jpg"

        elif photo.content_type == "image/png":
            extension = ".png"

        else:
            extension = ".webp"

    # --------------------------------------------------------
    # Create unique MinIO object key
    # --------------------------------------------------------

    object_key = (
        f"reports/{report_id}/{uuid4()}{extension}"
    )

    # --------------------------------------------------------
    # Upload image to MinIO
    # --------------------------------------------------------

    try:
        photo.file.seek(0, 2)

        file_size = photo.file.tell()

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

    # --------------------------------------------------------
    # Save photo metadata in PostgreSQL
    # --------------------------------------------------------

    report_photo = ReportPhoto(
        report_id=report_id,
        object_key=object_key,
        original_filename=photo.filename or "photo",
        content_type=photo.content_type,
    )

    db.add(report_photo)

    db.commit()

    db.refresh(report_photo)

    return {
        "id": report_photo.id,
        "report_id": report_photo.report_id,
        "object_key": object_key,
        "original_filename": report_photo.original_filename,
        "content_type": report_photo.content_type,
        "created_at": report_photo.created_at,
    }


# ============================================================
# GET REPORT PHOTO
# ============================================================

@router.get(
    "/{report_id}/photo",
)
def get_report_photo(
    report_id: UUID,
    db: Session = Depends(get_db),
):
    # --------------------------------------------------------
    # Check that the report exists
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Find the photo metadata
    # --------------------------------------------------------

    report_photo = (
        db.query(ReportPhoto)
        .filter(
            ReportPhoto.report_id == report_id
        )
        .order_by(
            ReportPhoto.created_at.desc()
        )
        .first()
    )

    if report_photo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No photo found for this report",
        )

    # --------------------------------------------------------
    # Retrieve the actual image from MinIO
    # --------------------------------------------------------

    try:
        response = minio_client.get_object(
            settings.minio_bucket,
            report_photo.object_key,
        )

        image_data = response.read()

        response.close()
        response.release_conn()

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Photo retrieval failed: {exc}",
        )

    # --------------------------------------------------------
    # Return the actual image
    # --------------------------------------------------------

    return Response(
        content=image_data,
        media_type=report_photo.content_type,
        headers={
            "Content-Disposition": (
                f'inline; filename="{report_photo.original_filename}"'
            )
        },
    )