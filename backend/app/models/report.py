from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Report(Base):
    __tablename__ = "reports"

    # Internal database ID
    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    # Human-readable Report ID shown to citizens and NGO staff
    # Example: RPT-2026-000001
    report_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False,
    )

    # Citizen who submitted the report
    reporter_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    # NULL until NGO verifies the report and creates an Animal
    animal_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("animals.id"),
        nullable=True,
    )

    # Type of report
    # Example: STRAY, LOST, FOUND
    report_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    # Citizen's description of the animal/report
    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Location where the animal was reported
    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # New reports always start as PENDING
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="PENDING",
    )

    # Time when the report was created
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )