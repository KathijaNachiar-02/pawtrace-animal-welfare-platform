"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(
    randomValues,
    (value) => characters[value % characters.length]
  ).join("");
}

async function createCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");

    if (error) {
      router.replace("/login");
    }
  }, [router]);

  const loginWithKeycloak = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await createCodeChallenge(codeVerifier);

    sessionStorage.setItem("pkce_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: "pawtrace-frontend",
      response_type: "code",
      scope: "openid",
      redirect_uri: "http://localhost:3000/auth/callback",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    window.location.href =
      `http://localhost:8080/realms/pawtrace/protocol/openid-connect/auth?${params.toString()}`;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="text-4xl">🐾</div>

          <h1 className="mt-3 text-3xl font-bold text-green-700">
            Welcome to PawTrace
          </h1>

          <p className="mt-2 text-gray-600">
            Sign in to continue
          </p>
        </div>

        <button
          type="button"
          onClick={loginWithKeycloak}
          className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800"
        >
          Login with Keycloak
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          You will be securely redirected to PawTrace authentication.
        </p>
      </div>
    </main>
  );
}
