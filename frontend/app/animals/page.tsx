import Link from "next/link";
import DashboardShell from "../../components/layout/dashboard-shell";

const animals = [
  {
    id: 1,
    name: "Bruno",
    type: "Dog",
    category: "Pet",
    age: "3 years",
    gender: "Male",
    status: "Healthy",
  },
  {
    id: 2,
    name: "Milo",
    type: "Cat",
    category: "Pet",
    age: "2 years",
    gender: "Male",
    status: "Healthy",
  },
  {
    id: 3,
    name: "Luna",
    type: "Dog",
    category: "Stray",
    age: "1 year",
    gender: "Female",
    status: "Needs Care",
  },
];

export default function AnimalsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Animal Directory
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Animals
            </h1>

            <p className="mt-2 text-gray-500">
              View and manage animals registered in PawTrace.
            </p>
          </div>

          <Link
            href="/animals/create"
            className="inline-flex items-center justify-center rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            + Add Animal
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search animals
              </label>

              <input
                id="search"
                type="text"
                placeholder="Search by name, breed, or ID..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="animal-type"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Animal type
              </label>

              <select
                id="animal-type"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
              >
                <option>All animals</option>
                <option>Dogs</option>
                <option>Cats</option>
              </select>
            </div>
          </div>
        </div>

        {/* Animal List */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Registered Animals
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {animals.length} animals currently listed
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-40 items-center justify-center bg-green-50">
                  <span className="text-6xl">
                    {animal.type === "Dog" ? "🐕" : "🐈"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {animal.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {animal.type} · {animal.category}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        animal.status === "Healthy"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {animal.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-400">Age</p>
                      <p className="mt-1 font-medium text-gray-800">
                        {animal.age}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-400">Gender</p>
                      <p className="mt-1 font-medium text-gray-800">
                        {animal.gender}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/animals/${animal.id}`}
                    className="mt-5 block rounded-xl border border-green-200 px-4 py-3 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50"
                  >
                    View Animal Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}