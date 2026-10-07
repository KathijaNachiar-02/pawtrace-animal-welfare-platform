from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.report import Report
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