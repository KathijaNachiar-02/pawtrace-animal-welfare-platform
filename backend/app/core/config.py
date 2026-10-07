from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "PawTrace API"
    database_url: str = ""

    keycloak_url: str = "http://localhost:8080"
    keycloak_realm: str = "pawtrace"
    keycloak_client_id: str = "pawtrace-api"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()