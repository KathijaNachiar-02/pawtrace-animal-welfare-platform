import Link from "next/link";
import DashboardShell from "../../../components/layout/dashboard-shell";

export default function CreateAnimalPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/animals"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            ← Back to Animals
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-700">
            Animal Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add New Animal
          </h1>

          <p className="mt-2 text-gray-500">
            Create a digital profile so the animal&apos;s welfare journey can
            be tracked in PawTrace.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the animal&apos;s basic identification details.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Animal Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Bruno"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Animal Type
                </label>

                <select
                  id="type"
                  name="type"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
                >
                  <option value="">Select type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
                >
                  <option value="">Select category</option>
                  <option value="pet">Pet</option>
                  <option value="stray">Stray</option>
                  <option value="community">Community Animal</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="breed"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Breed
                </label>

                <input
                  id="breed"
                  name="breed"
                  type="text"
                  placeholder="e.g. Labrador"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Age
                </label>

                <input
                  id="age"
                  name="age"
                  type="text"
                  placeholder="e.g. 3 years"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location & Appearance */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Location & Appearance
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Help identify and locate the animal.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="color"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Color / Markings
                </label>

                <input
                  id="color"
                  name="color"
                  type="text"
                  placeholder="e.g. Brown with white chest"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Current Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. RS Puram, Coimbatore"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Additional Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add anything else that may help with the animal&apos;s care or
                identification.
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the animal, condition, behavior, identifying marks, or other important information..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </div>
          </section>

          {/* Photo */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Animal Photo
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a clear photo to help identify the animal.
              </p>
            </div>

            <label
              htmlFor="photo"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:border-green-300 hover:bg-green-50"
            >
              <div className="text-4xl">📷</div>

              <p className="mt-3 text-sm font-semibold text-gray-700">
                Upload an animal photo
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG or JPEG
              </p>

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
              />
            </label>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/animals"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              Add Animal
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}