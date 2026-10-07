"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Camera,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Upload,
  FileText,
  PlusCircle,
  ArrowLeft,
} from "lucide-react";

import DashboardShell from "../../../components/layout/dashboard-shell";

type CreatedReport = {
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

export default function CreateAnimalPage() {
  const [photo, setPhoto] = useState<File | null>(null);

  const [condition, setCondition] = useState("");

  const [observations, setObservations] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  const [submittedReport, setSubmittedReport] =
    useState<CreatedReport | null>(null);

  function handlePhotoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setPhoto(null);
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPhoto(null);

      setMessage(
        "Please upload a JPG, JPEG, or PNG image."
      );

      setMessageType("error");

      event.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhoto(null);

      setMessage(
        "Photo size must be less than 5 MB."
      );

      setMessageType("error");

      event.target.value = "";

      return;
    }

    setPhoto(file);

    setMessage("");

    setMessageType("");
  }

  function toggleObservation(value: string) {
    setObservations((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function getPriority() {
    if (
      observations.includes("Hit by vehicle") ||
      observations.includes("Bleeding") ||
      observations.includes(
        "Very weak / unconscious"
      ) ||
      condition === "IMMEDIATE_DANGER"
    ) {
      return "CRITICAL";
    }

    if (
      condition === "INJURED" ||
      condition === "SICK_WEAK" ||
      observations.includes("Cannot walk") ||
      observations.includes("Trapped")
    ) {
      return "HIGH";
    }

    return "LOW";
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsSubmitting(true);

    setMessage("");

    setMessageType("");

    try {
      const formData = new FormData(
        event.currentTarget
      );

      const animalType =
        (formData.get("animal_type") as string) || "";

      const location =
        (formData.get("location") as string) || "";

      const landmark =
        (formData.get("landmark") as string) || "";

      const description =
        (formData.get("description") as string) || "";

      const priority = getPriority();

      const reportDescription = [
        `Animal type: ${animalType}`,

        `Condition: ${condition}`,

        `Observations: ${
          observations.length > 0
            ? observations.join(", ")
            : "None reported"
        }`,

        `Nearby landmark: ${
          landmark || "Not provided"
        }`,

        `Initial priority: ${priority}`,

        `Additional description: ${description}`,
      ].join("\n");

      /*
       * Temporary test citizen.
       *
       * Later this will come from Keycloak.
       */

      const reporterId =
        "0ae05cb6-ef23-487f-9d94-62422110e552";

      const response = await fetch(
        "http://localhost:8000/api/v1/reports/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            reporter_id: reporterId,

            report_type: "STRAY",

            description: reportDescription,

            location: location,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage =
          "Failed to submit the report.";

        try {
          const errorData =
            await response.json();

          if (
            typeof errorData.detail === "string"
          ) {
            errorMessage =
              errorData.detail;
          } else if (
            Array.isArray(errorData.detail)
          ) {
            errorMessage =
              "Please check the information entered in the form.";
          }
        } catch {
          errorMessage =
            "The server returned an unexpected response.";
        }

        throw new Error(errorMessage);
      }

      const createdReport =
        (await response.json()) as CreatedReport;

      console.log(
        "Report created successfully:",
        createdReport
      );

      /*
       * Store the created report.
       *
       * This changes the page from the
       * form to the confirmation screen.
       */

      setSubmittedReport(createdReport);

      setMessage("");

      setMessageType("");
    } catch (error) {
      console.error(
        "Error submitting report:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * ========================================================
   * SUCCESS SCREEN
   * ========================================================
   *
   * Once the report has been created, do not show
   * the filled-in form again.
   */

  if (submittedReport) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <Link
              href="/animals"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
            >
              <ArrowLeft size={16} />
              Back to Animals
            </Link>
          </div>

          <div className="rounded-3xl border border-green-200 bg-white p-8 text-center shadow-sm sm:p-10">
            {/* SUCCESS ICON */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={46}
                className="text-green-600"
                strokeWidth={2}
              />
            </div>

            {/* TITLE */}

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Report Submitted Successfully
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              Thank you for helping an animal in need.
              Your report has been submitted to the
              PawTrace team for verification.
            </p>

            {/* REPORT INFORMATION */}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left">
              <div className="flex items-center gap-3">
                <FileText
                  size={22}
                  className="text-green-700"
                />

                <h2 className="font-bold text-gray-900">
                  Report Details
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Report ID
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-700">
                    {submittedReport.report_number}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                    {submittedReport.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-gray-800">
                    {submittedReport.location}
                  </p>
                </div>
              </div>
            </div>

            {/* INFORMATION MESSAGE */}

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left">
              <p className="text-sm leading-6 text-blue-900">
                Your report is currently{" "}
                <strong>PENDING</strong>. A PawTrace
                team member will review the report and
                verify the animal.
              </p>
            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/reports/${submittedReport.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                <FileText size={18} />
                View Report
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSubmittedReport(null);

                  setPhoto(null);

                  setCondition("");

                  setObservations([]);

                  setMessage("");

                  setMessageType("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                <PlusCircle size={18} />
                Submit Another Report
              </button>
            </div>

            <Link
              href="/animals"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Animals
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

  /*
   * ========================================================
   * REPORT FORM
   * ========================================================
   */

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        {/* PAGE HEADER */}

        <div className="mb-8">
          <Link
            href="/animals"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            ← Back to Animals
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-700">
            Animal Report
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Report an Animal
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            Tell us what you observed. You do not need
            to know the animal&apos;s breed, medical
            details, or other technical information.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* ANIMAL TYPE */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                What animal did you see?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Select the animal type you observed.
              </p>
            </div>

            <div>
              <label
                htmlFor="animalType"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Animal type
              </label>

              <select
                id="animalType"
                name="animal_type"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="">
                  Select animal type
                </option>

                <option value="DOG">
                  Dog
                </option>

                <option value="CAT">
                  Cat
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>
          </section>

          {/* PHOTO */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Add a photo
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                A photo helps our team identify and
                verify the animal.
              </p>
            </div>

            <label
              htmlFor="photo"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-green-400 hover:bg-green-50"
            >
              {photo ? (
                <>
                  <CheckCircle2
                    size={42}
                    className="text-green-600"
                  />

                  <p className="mt-3 text-sm font-semibold text-gray-800">
                    {photo.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {(
                      photo.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </p>
                </>
              ) : (
                <>
                  <Camera
                    size={42}
                    strokeWidth={1.6}
                    className="text-gray-500"
                  />

                  <p className="mt-3 text-sm font-semibold text-gray-800">
                    Upload an animal photo
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    JPG, JPEG or PNG • Maximum 5 MB
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white">
                    <Upload size={15} />
                    Choose Photo
                  </span>
                </>
              )}

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>

            <p className="mt-3 text-xs text-gray-500">
              Photo storage will be connected to MinIO
              in the next step.
            </p>
          </section>

          {/* LOCATION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Where did you see the animal?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Give us enough information for the rescue
                team to find the location.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. RS Puram, Coimbatore"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="landmark"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Nearby landmark

                  <span className="ml-1 font-normal text-gray-500">
                    (optional)
                  </span>
                </label>

                <input
                  id="landmark"
                  name="landmark"
                  type="text"
                  placeholder="e.g. Near the bus stop"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </section>

          {/* CONDITION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                How does the animal look?
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Choose the option that best describes
                what you observed.
              </p>
            </div>

            <div className="space-y-3">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  condition === "OK"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value="OK"
                  checked={condition === "OK"}
                  onChange={(event) =>
                    setCondition(event.target.value)
                  }
                  className="mt-1 h-4 w-4 accent-green-700"
                  required
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Appears okay
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    No obvious injury or serious problem.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  condition === "SICK_WEAK"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value="SICK_WEAK"
                  checked={
                    condition === "SICK_WEAK"
                  }
                  onChange={(event) =>
                    setCondition(event.target.value)
                  }
                  className="mt-1 h-4 w-4 accent-yellow-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Sick or weak
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    The animal looks unwell, weak, or is
                    behaving unusually.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  condition === "INJURED"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value="INJURED"
                  checked={
                    condition === "INJURED"
                  }
                  onChange={(event) =>
                    setCondition(event.target.value)
                  }
                  className="mt-1 h-4 w-4 accent-orange-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Injured
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    The animal appears to have an injury.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  condition === "IMMEDIATE_DANGER"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value="IMMEDIATE_DANGER"
                  checked={
                    condition ===
                    "IMMEDIATE_DANGER"
                  }
                  onChange={(event) =>
                    setCondition(event.target.value)
                  }
                  className="mt-1 h-4 w-4 accent-red-600"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    In immediate danger
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    The animal may be in a life-threatening
                    or dangerous situation.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* OBSERVATIONS */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={21}
                  className="text-orange-500"
                />

                <h2 className="text-xl font-bold text-gray-900">
                  What did you observe?
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-600">
                Select anything that applies.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Bleeding",
                "Hit by vehicle",
                "Cannot walk",
                "Trapped",
                "Very weak / unconscious",
                "Other",
              ].map((item) => {
                const selected =
                  observations.includes(item);

                return (
                  <label
                    key={item}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      selected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleObservation(item)
                      }
                      className="h-4 w-4 rounded accent-green-700"
                    />

                    <span className="text-sm font-medium text-gray-800">
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* DESCRIPTION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Tell us more
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Describe anything else you noticed.
              </p>
            </div>

            <textarea
              id="description"
              name="description"
              rows={5}
              required
              placeholder="For example: The dog is lying near the road and seems unable to stand..."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </section>

          {/* INFO */}

          <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
            <p className="text-sm font-medium text-blue-900">
              You don&apos;t need to know the animal&apos;s
              breed, age, sex, or medical details. Just tell
              us what you can observe.
            </p>
          </div>

          {/* ERROR MESSAGE */}

          {message && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
              <p className="text-sm font-medium text-red-800">
                {message}
              </p>
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/animals"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                isSubmitting || !condition
              }
              className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}