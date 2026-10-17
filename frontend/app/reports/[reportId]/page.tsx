"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Report = {
  id: string;
  report_number: string;
  reporter_id: string;
  animal_id: string | null;
  report_type: string;
  description: string;
  location: string;
  status: string;
  created_at: string;
};

type PageProps = {
  params: Promise<{
    reportId: string;
  }>;
};

export default function ReportDetailsPage({
  params,
}: PageProps) {
  const [reportId, setReportId] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap Next.js 16 params Promise
  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setReportId(resolvedParams.reportId);
    }

    getParams();
  }, [params]);

  // Load report after reportId is available
  useEffect(() => {
    if (!reportId) {
      return;
    }

    async function loadReport() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8000/api/v1/reports/${reportId}`
        );

        if (!response.ok) {
          throw new Error("Report not found");
        }

        const data = (await response.json()) as Report;

        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load report.");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">
          Loading report...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">
          Report not found
        </h1>

        <p className="text-gray-600">
          {error || "The requested report could not be found."}
        </p>

        <Link
          href="/animals/create"
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Submit another report
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/animals/create"
            className="text-sm text-green-600 hover:underline"
          >
            ← Back to report form
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Report Details
          </h1>

          <p className="mt-1 text-gray-600">
            View the details of your submitted animal report.
          </p>
        </div>

        {/* Report card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {/* Report number + status */}
          <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Report ID
              </p>

              <p className="text-xl font-semibold text-gray-900">
                {report.report_number}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
              {report.status}
            </span>
          </div>

          {/* Report information */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Report Type
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {report.report_type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {report.location}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">
                Description
              </p>

              <p className="mt-1 text-gray-900">
                {report.description}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Submitted
              </p>

              <p className="mt-1 text-gray-900">
                {new Date(
                  report.created_at
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Report Status
              </p>

              <p className="mt-1 font-medium text-yellow-700">
                {report.status}
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Report Photo
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Photo submitted with this report.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border bg-gray-100">
              <img
                src={`http://localhost:8000/api/v1/reports/${report.id}/photo`}
                alt="Animal reported by citizen"
                className="max-h-[500px] w-full object-contain"
              />
            </div>
          </div>

          {/* Pending message */}
          <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="font-semibold text-yellow-900">
              Report is pending verification
            </h3>

            <p className="mt-1 text-sm text-yellow-800">
              Your report has been submitted successfully.
              An NGO staff member will review the report
              and verify the information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}