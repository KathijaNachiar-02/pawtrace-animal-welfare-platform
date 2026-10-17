from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class AnimalPassport(Base):
    __tablename__ = "animal_passports"

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    animal_id: Mapped[UUID] = mapped_column(
        ForeignKey("animals.id"),
        nullable=False,
        unique=True,
    )

    microchip_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    identification_markings: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    rescue_date: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    rescue_location: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    current_status: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )