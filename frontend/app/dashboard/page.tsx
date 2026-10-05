import DashboardShell from "../../components/layout/dashboard-shell";

const stats = [
  {
    title: "Animals Registered",
    value: "124",
    description: "Total animals in PawTrace",
  },
  {
    title: "Active Reports",
    value: "18",
    description: "Reports waiting for action",
  },
  {
    title: "Rescue Cases",
    value: "12",
    description: "Currently being handled",
  },
  {
    title: "Adoptions",
    value: "36",
    description: "Successful adoptions",
  },
];

const quickActions = [
  {
    title: "Report an Animal",
    description: "Report a stray, injured, or vulnerable animal.",
    href: "/reports",
  },
  {
    title: "View Animals",
    description: "Browse animal profiles and care information.",
    href: "/animals",
  },
  {
    title: "Find Adoption",
    description: "Explore animals looking for a loving home.",
    href: "/adoption",
  },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl">
        {/* Welcome Section */}
        <section className="rounded-2xl bg-green-50 px-6 py-8 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            PawTrace Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome back 👋
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Manage animals, rescue activities, health records, foster care,
            and adoption from one place.
          </p>
        </section>

        {/* Statistics */}
        <section className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-green-700">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Start with one of the most common PawTrace activities.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                  🐾
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-green-700">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {action.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-green-700">
                  Open →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Journey Section */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Animal Care Journey
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              From report to a safe forever home
            </h2>

            <p className="mt-3 text-gray-600">
              PawTrace keeps the animal&apos;s information connected throughout
              the complete welfare journey.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              "Report",
              "Verify",
              "Identify",
              "Rescue",
              "Care",
              "Adoption",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-xl bg-gray-50 p-4 text-center"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}