"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import DashboardShell from "../../../components/layout/dashboard-shell";

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

export default function ReportDetailsPage({
  params,
}: {
  params: { reportId: string };
}) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/reports/${params.reportId}`
        );

        if (!response.ok) {
          throw new Error("Report not found");
        }

        const data = (await response.json()) as Report;

        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this report.");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [params.reportId]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="p-8">
          <p className="text-gray-600">
            Loading report...
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (error || !report) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-3xl p-8">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold">
              Report Not Found
            </h1>

            <p className="mt-2 text-gray-600">
              {error || "The requested report could not be found."}
            </p>

            <Link
              href="/animals/create"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back to Report Form
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/animals/create"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>

        {/* Report card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gray-100 p-3">
              <FileText size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Animal Report
              </h1>

              <p className="mt-1 text-gray-500">
                {report.report_number}
              </p>
            </div>
          </div>

          {/* Report information */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Report ID */}
            <div>
              <p className="text-sm text-gray-500">
                Report ID
              </p>

              <p className="mt-1 font-semibold">
                {report.report_number}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                {report.status}
              </span>
            </div>

            {/* Animal type */}
            <div>
              <p className="text-sm text-gray-500">
                Animal Type
              </p>

              <p className="mt-1 font-semibold">
                {report.report_type}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="mt-1 font-semibold">
                {report.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Report Details
            </p>

            <div className="mt-2 whitespace-pre-line rounded-xl bg-gray-50 p-5 text-gray-700">
              {report.description}
            </div>
          </div>

          {/* Submitted date */}
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Submitted On
            </p>

            <p className="mt-1 font-medium">
              {new Date(report.created_at).toLocaleString()}
            </p>
          </div>

          {/* Current workflow status */}
          <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="font-semibold text-yellow-900">
              Report is awaiting verification
            </p>

            <p className="mt-1 text-sm text-yellow-800">
              An NGO staff member will review this report
              and verify the animal details.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}