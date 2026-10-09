"use client";

import { useEffect, useRef, useState } from "react";

export default function AuthCallbackPage() {
  const hasRun = useRef(false);
  const [message, setMessage] = useState("Completing sign in...");

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);

      const code = params.get("code");
      const error = params.get("error");

      if (error) {
        setMessage(`Login failed: ${error}`);
        return;
      }

      if (!code) {
        setMessage("No authorization code was returned.");
        return;
      }

      const codeVerifier = sessionStorage.getItem("pkce_code_verifier");

      if (!codeVerifier) {
        setMessage("PKCE session expired. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/realms/pawtrace/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: "pawtrace-frontend",
              code,
              redirect_uri: "http://localhost:3000/auth/callback",
              code_verifier: codeVerifier,
            }),
          }
        );

        const rawResponse = await response.text();

        if (!response.ok) {
          console.error("Token exchange failed:", rawResponse);
          setMessage(`Keycloak error: ${rawResponse}`);
          return;
        }

        const data = JSON.parse(rawResponse);

        if (!data.access_token) {
          setMessage("Keycloak returned no access token.");
          return;
        }

        localStorage.setItem(
          "pawtrace_access_token",
          data.access_token
        );

        console.log(
          "Token received:",
          data.access_token.length > 0
        );

        console.log(
          "Token saved:",
          localStorage.getItem("pawtrace_access_token") !== null
        );

        sessionStorage.removeItem("pkce_code_verifier");

        setMessage("LOGIN SUCCESSFUL — TOKEN SAVED");
      } catch (error) {
        console.error("Authentication error:", error);
        setMessage("Unable to connect to Keycloak.");
      }
    };

    handleCallback();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-green-700">
          {message}
        </h1>
      </div>
    </main>
  );
}