
import httpx

from app.core.config import settings


def get_admin_access_token() -> str:
    """Get an access token for the backend's Keycloak service account."""
    token_url = (
        f"{settings.keycloak_url}/realms/{settings.keycloak_realm}"
        "/protocol/openid-connect/token"
    )

    response = httpx.post(
        token_url,
        data={
            "grant_type": "client_credentials",
            "client_id": settings.keycloak_admin_client_id,
            "client_secret": settings.keycloak_admin_client_secret,
        },
        timeout=10.0,
    )

    if response.is_error:
        raise RuntimeError(
            f"Keycloak service-account authentication failed "
            f"(HTTP {response.status_code})."
        )

    token = response.json().get("access_token")
    if not token:
        raise RuntimeError("Keycloak returned no service-account access token.")

    return token

def create_keycloak_user(
    email: str,
    full_name: str,
    password: str,
) -> str:
    """Create a citizen account in Keycloak and return its user ID."""
    token = get_admin_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    users_url = (
        f"{settings.keycloak_url}/admin/realms/"
        f"{settings.keycloak_realm}/users"
    )

    user_payload = {
        "username": email,
        "email": email,
        "firstName": full_name,
        "enabled": True,
        "emailVerified": False,
        "credentials": [
            {
                "type": "password",
                "value": password,
                "temporary": False,
            }
        ],
    }

    with httpx.Client(timeout=10.0) as client:
        response = client.post(
            users_url,
            headers=headers,
            json=user_payload,
        )

        if response.status_code == 409:
            raise ValueError("An account with this email already exists.")

        if response.status_code != 201:
            raise RuntimeError(
                f"Keycloak user creation failed "
                f"(HTTP {response.status_code})."
            )

        location = response.headers.get("Location")
        if not location:
            raise RuntimeError(
                "Keycloak created the account but returned no user location."
            )

        keycloak_id = location.rstrip("/").split("/")[-1]

        roles_response = client.get(
            f"{settings.keycloak_url}/admin/realms/"
            f"{settings.keycloak_realm}/roles/citizen",
            headers=headers,
        )

        if roles_response.status_code != 200:
            client.delete(
                f"{users_url}/{keycloak_id}",
                headers=headers,
            )
            raise RuntimeError(
                "Could not retrieve the citizen role from Keycloak."
            )

        role = roles_response.json()
        mapping_response = client.post(
            f"{users_url}/{keycloak_id}/role-mappings/realm",
            headers=headers,
            json=[role],
        )

        if mapping_response.status_code != 204:
            client.delete(
                f"{users_url}/{keycloak_id}",
                headers=headers,
            )
            raise RuntimeError(
                "Could not assign the citizen role in Keycloak."
            )

    return keycloak_id
def delete_keycloak_user(keycloak_id: str) -> None:
    """Delete a Keycloak account during registration rollback."""
    token = get_admin_access_token()
    headers = {"Authorization": f"Bearer {token}"}

    user_url = (
        f"{settings.keycloak_url}/admin/realms/"
        f"{settings.keycloak_realm}/users/{keycloak_id}"
    )

    response = httpx.delete(
        user_url,
        headers=headers,
        timeout=10.0,
    )

    if response.status_code not in (204, 404):
        raise RuntimeError(
            f"Keycloak account cleanup failed "
            f"(HTTP {response.status_code})."
        )

