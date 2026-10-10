
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "PawTrace API"
    database_url: str = ""

    # MinIO
    minio_endpoint: str = ""
    minio_access_key: str = ""
    minio_secret_key: str = ""
    minio_bucket: str = "pawtrace-reports"
    minio_secure: bool = False

    # Keycloak
    keycloak_url: str = "http://localhost:8080"
    keycloak_realm: str = "pawtrace"
    keycloak_client_id: str = "pawtrace-api"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()
