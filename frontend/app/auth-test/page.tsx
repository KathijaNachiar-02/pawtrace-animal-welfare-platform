"use client";

import { useEffect, useState } from "react";

export default function AuthTestPage() {
  const [message, setMessage] = useState("Testing...");

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("pawtrace_access_token");

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/health",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(`Backend error: ${data.detail}`);
          return;
        }

        setMessage(
          `Backend connected successfully. User: ${data.user}`
        );
      } catch (error) {
        console.error(error);
        setMessage("Could not connect to the PawTrace backend.");
      }
    };

    run();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-green-700">
          PawTrace Backend Test
        </h1>

        <p className="mt-4 text-gray-700">{message}</p>
      </div>
    </main>
  );
}