
"use client";

import { useEffect, useRef, useState } from "react";

export default function AuthCallbackPage() {
  const hasRun = useRef(false);
  const [message, setMessage] = useState("Signing you in to PawTrace...");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function handleCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");

      if (error || !code) {
        setMessage("Login failed. Please return to the login page.");
        return;
      }

      const codeVerifier = sessionStorage.getItem("pkce_code_verifier");

      if (!codeVerifier) {
        setMessage("Your login session expired. Please log in again.");
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

        if (!response.ok) {
          setMessage("Unable to sign in. Please try again.");
          return;
        }

        const data = await response.json();

        if (!data.access_token) {
          setMessage("No login token was received. Please try again.");
          return;
        }

        // Read the role from the Keycloak access token.
        const tokenParts = data.access_token.split(".");
        if (tokenParts.length !== 3) {
          setMessage("Invalid login response. Please try again.");
          return;
        }

        const base64 = tokenParts[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const payload = JSON.parse(
          atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))
        );

        const roles: string[] = payload.realm_access?.roles ?? [];

        let destination = "";

        if (roles.includes("admin")) {
          destination = "/admin";
        } else if (roles.includes("ngo")) {
          destination = "/ngo";
        } else if (roles.includes("citizen")) {
          destination = "/citizen";
        } else {
          setMessage(
            "Your account has no PawTrace role. Please contact the administrator."
          );
          return;
        }

        localStorage.setItem("pawtrace_access_token", data.access_token);
        sessionStorage.removeItem("pkce_code_verifier");

        // Open the portal for the user's assigned role.
        window.location.replace(destination);
      } catch (err) {
        console.error("Login error:", err);
        setMessage("Unable to connect. Please try logging in again.");
      }
    }

    handleCallback();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
          🐾
        </div>
        <h1 className="text-2xl font-bold text-green-800">
          PawTrace
        </h1>
        <p className="mt-3 text-gray-600">{message}</p>
      </div>
    </main>
  );
}
