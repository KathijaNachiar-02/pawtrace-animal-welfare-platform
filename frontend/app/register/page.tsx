"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");
const [isError, setIsError] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isRegistered, setIsRegistered] = useState(false);

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();
setMessage("");
setIsError(false);

if (password !== confirmPassword) {
  setIsError(true);
  setMessage("Passwords do not match.");
  return;
}

if (password.length < 8) {
  setIsError(true);
  setMessage("Password must contain at least 8 characters.");
  return;
}

setIsSubmitting(true);

try {
  const response = await fetch("http://localhost:8000/api/v1/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName.trim(),
      email: email.trim(),
      password,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = data.detail;
    const errorMessage = Array.isArray(detail)
      ? detail
          .map((item: { msg?: string }) => item.msg ?? "Invalid input")
          .join(" ")
      : typeof detail === "string"
        ? detail
        : "Registration failed. Please try again.";

    throw new Error(errorMessage);
  }

  setIsRegistered(true);
  setMessage(
    "Your account has been created successfully. You can now log in with Keycloak.",
  );
  setFullName("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
} catch (error) {
  setIsError(true);
  setMessage(
    error instanceof TypeError
      ? "Cannot connect to the server. Please make sure the PawTrace backend is running."
      : error instanceof Error
        ? error.message
        : "Registration failed. Please try again.",
  );
} finally {
  setIsSubmitting(false);
}

}

return (
<main className="flex min-h-screen items-center justify-center bg-green-50 px-6 py-10">
<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
{/* Header */}
<div className="mb-8 text-center">
<div className="text-4xl">{"🐾"}</div>

      <h1 className="mt-3 text-3xl font-bold text-green-700">
        Create Your PawTrace Account
      </h1>

      <p className="mt-2 text-gray-600">
        Join us in helping animals
      </p>
    </div>

    {/* Registration Form */}
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-medium text-gray-700"
        >
          Full Name
        </label>

        <input
          id="name"
          name="full_name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          maxLength={150}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          maxLength={128}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block font-medium text-gray-700"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
          maxLength={128}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      {/* Public registrations receive the citizen role */}
      <p className="text-sm text-gray-600">
        New accounts are registered as citizens. Additional roles are
        assigned by an administrator.
      </p>

      {/* Status Message */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-lg p-3 text-sm ${
            isError
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Register Button */}
      {!isRegistered ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      ) : (
        <Link
          href="/login"
          className="block w-full rounded-lg bg-green-700 py-3 text-center font-semibold text-white hover:bg-green-800"
        >
          Continue to Login
        </Link>
      )}
    </form>

    {/* Login Link */}
    <p className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-semibold text-green-700 hover:text-green-800"
      >
        Login
      </Link>
    </p>

    {/* Back to Home */}
    <div className="mt-6 text-center">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-green-700"
      >
        {"←"} Back to PawTrace
      </Link>
    </div>
  </div>
</main>

);
}