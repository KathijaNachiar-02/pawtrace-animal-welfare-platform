import Link from "next/link";
import DashboardShell from "../../../components/layout/dashboard-shell";

export default function AnimalProfilePage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          href="/animals"
          className="text-sm font-medium text-green-700 hover:text-green-800"
        >
          ← Back to Animals
        </Link>

        {/* Profile Header */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-green-50 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-white text-7xl shadow-sm">
                🐕
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Bruno
                  </h1>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Healthy
                  </span>
                </div>

                <p className="mt-2 text-gray-600">
                  Dog · Labrador · Male · 3 years
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  PawTrace ID: PT-ANM-0001
                </p>
              </div>

              <button className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Details */}
          <div className="grid divide-y border-t border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Category
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Pet
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Location
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Coimbatore
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Current Stage
              </p>
              <p className="mt-2 font-semibold text-green-700">
                In Care
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                About Bruno
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Bruno is a friendly Labrador who is currently registered in
                PawTrace. His profile keeps his identity, welfare information,
                and care history connected throughout his journey.
              </p>
            </section>

            {/* Health Summary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Health Summary
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest recorded health information
                  </p>
                </div>

                <Link
                  href="/health"
                  className="text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  View Health →
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs text-gray-500">
                    Health Status
                  </p>
                  <p className="mt-2 font-semibold text-green-700">
                    Healthy
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Vaccinations
                  </p>
                  <p className="mt-2 font-semibold text-gray-800">
                    Up to date
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Last Checkup
                  </p>
                  <p className="mt-2 font-semibold text-gray-800">
                    12 Sep 2026
                  </p>
                </div>
              </div>
            </section>

            {/* Care Journey */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Care Journey
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Bruno&apos;s journey through PawTrace
              </p>

              <div className="mt-6 space-y-6">
                {[
                  {
                    title: "Animal Registered",
                    date: "12 Sep 2026",
                    description:
                      "Animal profile created in PawTrace.",
                  },
                  {
                    title: "Health Check Completed",
                    date: "12 Sep 2026",
                    description:
                      "Routine health assessment completed.",
                  },
                  {
                    title: "Vaccination Updated",
                    date: "13 Sep 2026",
                    description:
                      "Vaccination information added to the health record.",
                  },
                ].map((event, index) => (
                  <div key={event.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                        {index + 1}
                      </div>

                      {index < 2 && (
                        <div className="mt-2 h-full w-px bg-gray-200" />
                      )}
                    </div>

                    <div className="pb-4">
                      <p className="font-semibold text-gray-900">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {event.date}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Identification */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Identification
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-gray-400">
                    PawTrace ID
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    PT-ANM-0001
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Color / Markings
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Golden brown with white chest
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Registered
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    12 Sep 2026
                  </p>
                </div>
              </div>
            </section>

            {/* Current Status */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Current Status
              </h2>

              <div className="mt-5 rounded-xl bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">
                  Safe & In Care
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Bruno is currently safe and receiving appropriate care.
                </p>
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Actions
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  href="/health"
                  className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Manage Health
                </Link>

                <Link
                  href="/foster"
                  className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Foster Information
                </Link>

                <Link
                  href="/adoption"
                  className="block rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Adoption Information
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}