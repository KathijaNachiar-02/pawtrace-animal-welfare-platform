
from io import BytesIO
from types import SimpleNamespace
from uuid import uuid4
from datetime import datetime

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.db.database import get_db
from app.core.security import get_current_user
from app.models.user import User


@pytest.fixture
def client():
    app.dependency_overrides[get_current_user] = lambda: {
        "sub": "test-keycloak-user",
        "preferred_username": "test-citizen",
    }

    yield TestClient(app)

    app.dependency_overrides.clear()


def test_report_detail_not_found(client):
    """A request for a nonexistent report should return 404."""
    class FakeDB:
        def query(self, model):
            return self

        def filter(self, *args, **kwargs):
            return self

        def first(self):
            return None

    app.dependency_overrides[get_db] = lambda: FakeDB()

    response = client.get(f"/api/v1/reports/{uuid4()}")

    assert response.status_code == 404


def test_report_photo_upload_rejects_unsupported_type(client):
    """Unsupported photo types should be rejected."""
    class FakeDB:
        def query(self, model):
            return self

        def filter(self, *args, **kwargs):
            return self

        def first(self):
            return SimpleNamespace(id=uuid4())

    app.dependency_overrides[get_db] = lambda: FakeDB()

    response = client.post(
        f"/api/v1/reports/{uuid4()}/photo",
        files={
            "photo": (
                "document.txt",
                BytesIO(b"not an image"),
                "text/plain",
            )
        },
    )

    assert response.status_code == 400


def test_health_endpoint_requires_authentication():
    """Protected health endpoint should reject requests without a token."""
    response = TestClient(app).get("/api/v1/health")

    assert response.status_code in (401, 403)


def test_create_report_starts_as_pending(client, monkeypatch):
    """A successfully created report should start with PENDING status."""
    test_user = SimpleNamespace(
        id=uuid4(),
        keycloak_id="test-keycloak-user",
    )

    class FakeDB:
        def query(self, model):
            self.model = model
            return self

        def filter(self, *args, **kwargs):
            return self

        def first(self):
            if self.model is User:
                return test_user
            return None

        def add(self, obj):
            self.added = obj

        def commit(self):
            pass

        def refresh(self, obj):
            obj.id = uuid4()
            obj.created_at = datetime.now()
            obj.animal_id = None

    fake_db = FakeDB()
    app.dependency_overrides[get_db] = lambda: fake_db

    monkeypatch.setattr(
        "app.routes.reports.generate_report_number",
        lambda db: "RPT-2026-999999",
    )

    response = client.post(
        "/api/v1/reports/",
        json={
            "reporter_id": str(test_user.id),
            "report_type": "STRAY",
            "description": "Test animal report",
            "location": "Test location",
        },
    )

    assert response.status_code == 201
    assert response.json()["status"] == "PENDING"
    assert response.json()["report_number"] == "RPT-2026-999999"
    assert fake_db.added.status == "PENDING"


def test_report_photo_upload_success(client, monkeypatch):
    """A valid image should upload to MinIO and save its metadata."""
    from app.models.report import Report
    from app.models.report_photo import ReportPhoto

    report_id = uuid4()

    class FakeDB:
        def query(self, model):
            self.model = model
            return self

        def filter(self, *args, **kwargs):
            return self

        def first(self):
            if self.model is Report:
                return SimpleNamespace(id=report_id)
            return None

        def add(self, obj):
            self.added = obj

        def commit(self):
            pass

        def refresh(self, obj):
            obj.id = uuid4()
            obj.created_at = datetime.now()

    fake_db = FakeDB()
    app.dependency_overrides[get_db] = lambda: fake_db

    uploaded = {}

    def fake_put_object(bucket, object_key, file_obj, **kwargs):
        uploaded["bucket"] = bucket
        uploaded["object_key"] = object_key
        uploaded["content"] = file_obj.read()
        uploaded["content_type"] = kwargs["content_type"]

    monkeypatch.setattr(
        "app.routes.reports.minio_client.put_object",
        fake_put_object,
    )

    image_bytes = b"fake-jpeg-image-data"

    response = client.post(
        f"/api/v1/reports/{report_id}/photo",
        files={
            "photo": (
                "animal.jpg",
                BytesIO(image_bytes),
                "image/jpeg",
            )
        },
    )

    assert response.status_code == 201
    assert response.json()["report_id"] == str(report_id)
    assert response.json()["original_filename"] == "animal.jpg"
    assert response.json()["content_type"] == "image/jpeg"
    assert uploaded["content"] == image_bytes
    assert uploaded["content_type"] == "image/jpeg"
    assert isinstance(fake_db.added, ReportPhoto)
def test_report_photo_retrieval_success(client, monkeypatch):
    """Retrieving a saved photo returns its bytes and content type."""
    from app.models.report import Report
    from app.models.report_photo import ReportPhoto

    report_id = uuid4()
    image_bytes = b"fake-jpeg-image-data"

    fake_report = SimpleNamespace(id=report_id)
    fake_photo = SimpleNamespace(
        report_id=report_id,
        object_key=f"reports/{report_id}/animal.jpg",
        original_filename="animal.jpg",
        content_type="image/jpeg",
    )

    class FakeDB:
        def query(self, model):
            self.model = model
            return self

        def filter(self, *args, **kwargs):
            return self

        def order_by(self, *args, **kwargs):
            return self

        def first(self):
            if self.model is Report:
                return fake_report
            if self.model is ReportPhoto:
                return fake_photo
            return None

    class FakeMinioResponse:
        def read(self):
            return image_bytes

        def close(self):
            pass

        def release_conn(self):
            pass

    app.dependency_overrides[get_db] = lambda: FakeDB()

    monkeypatch.setattr(
        "app.routes.reports.minio_client.get_object",
        lambda *args, **kwargs: FakeMinioResponse(),
    )

    response = client.get(f"/api/v1/reports/{report_id}/photo")

    assert response.status_code == 200
    assert response.content == image_bytes
    assert response.headers["content-type"] == "image/jpeg"
    assert 'filename="animal.jpg"' in response.headers["content-disposition"]