from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint_without_token():
    """Requests without authentication must be rejected."""
    response = client.get("/api/v1/health")

    assert response.status_code in (401, 403)


def test_health_endpoint_with_invalid_token():
    """Requests with an invalid token must be rejected."""
    response = client.get(
        "/api/v1/health",
        headers={"Authorization": "Bearer invalid-token"},
    )

    assert response.status_code in (401, 403)


def test_health_endpoint_with_malformed_authorization_header():
    """Malformed authorization headers must not grant access."""
    response = client.get(
        "/api/v1/health",
        headers={"Authorization": "NotBearer invalid-token"},
    )

    assert response.status_code in (401, 403)
def test_health_endpoint_with_valid_token(monkeypatch):
    """A valid token should allow access to the protected endpoint."""
    from app.core import security

    expected_user = {
        "sub": "test-keycloak-user",
        "preferred_username": "test-citizen",
    }

    class FakeSigningKey:
        key = "test-signing-key"

    class FakeJwksClient:
        def get_signing_key_from_jwt(self, token):
            assert token == "valid-test-token"
            return FakeSigningKey()

    def fake_decode(token, key, algorithms, audience, issuer):
        assert token == "valid-test-token"
        assert algorithms == ["RS256"]
        assert audience == security.settings.keycloak_client_id
        assert issuer == security.KEYCLOAK_ISSUER
        return expected_user

    monkeypatch.setattr(
        security,
        "jwks_client",
        FakeJwksClient(),
    )
    monkeypatch.setattr(security.jwt, "decode", fake_decode)

    response = client.get(
        "/api/v1/health",
        headers={"Authorization": "Bearer valid-test-token"},
    )

    assert response.status_code == 200
def test_health_endpoint_with_expired_token(monkeypatch):
    """Expired tokens must be rejected with HTTP 401."""
    import jwt
    from app.core import security

    class FakeSigningKey:
        key = "test-signing-key"

    class FakeJwksClient:
        def get_signing_key_from_jwt(self, token):
            return FakeSigningKey()

    def fake_decode(*args, **kwargs):
        raise jwt.ExpiredSignatureError("Token has expired")

    monkeypatch.setattr(
        security,
        "jwks_client",
        FakeJwksClient(),
    )
    monkeypatch.setattr(security.jwt, "decode", fake_decode)

    response = client.get(
        "/api/v1/health",
        headers={"Authorization": "Bearer expired-test-token"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == (
        "Keycloak access token has expired"
    )