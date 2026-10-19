import Link from "next/link";

const statistics = [
  {
    label: "Registered NGOs",
    value: "28",
    icon: "🏢",
    note: "Sample registered organizations",
  },
  {
    label: "Platform Users",
    value: "1,284",
    icon: "👥",
    note: "Sample user accounts",
  },
  {
    label: "Rescue Cases",
    value: "156",
    icon: "🩺",
    note: "Sample cases across the platform",
  },
  {
    label: "Animals Tracked",
    value: "342",
    icon: "🐾",
    note: "Sample animal records",
  },
];

const activities = [
  {
    icon: "🏢",
    title: "New NGO registration submitted",
    detail: "Green Paws Animal Rescue · Sample activity",
    status: "Pending review",
    statusClass: "",
  },
  {
    icon: "🩺",
    title: "Rescue case status updated",
    detail: "Case PT-1042 · Sample activity",
    status: "In progress",
    statusClass: "admin-status-info",
  },
  {
    icon: "🐾",
    title: "Animal record added",
    detail: "Animal AN-206 · Sample activity",
    status: "Recorded",
    statusClass: "admin-status-success",
  },
  {
    icon: "👥",
    title: "New user registered",
    detail: "Platform account · Sample activity",
    status: "Registered",
    statusClass: "admin-status-success",
  },
];

const quickLinks = [
  {
    title: "Review NGO registrations",
    description: "Inspect organization records and review status.",
    href: "/admin/ngos",
  },
  {
    title: "Manage platform users",
    description: "View the sample user directory.",
    href: "/admin/users",
  },
  {
    title: "Review animal welfare reports",
    description: "Explore reported incidents and their statuses.",
    href: "/admin/reports",
  },
  {
    title: "Monitor rescue cases",
    description: "Review rescue case records across the platform.",
    href: "/admin/cases",
  },
];

export default function AdminOverviewPage() {
  return (
    <main>
      <div className="admin-page-header">
        <div>
          <p className="admin-eyebrow">PLATFORM OVERVIEW</p>

          <h1>Admin Dashboard</h1>

          <p className="admin-page-description">
            Monitor platform activity, organizations, users, and animal welfare
            operations from one place.
          </p>
        </div>

        <span className="admin-demo-label">
          Prototype · Sample data
        </span>
      </div>

      <section
        className="admin-stats-grid"
        aria-label="Platform statistics"
      >
        {statistics.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <div className="admin-stat-top">
              <span className="admin-stat-label">{stat.label}</span>

              <span className="admin-stat-icon" aria-hidden="true">
                {stat.icon}
              </span>
            </div>

            <div className="admin-stat-value">{stat.value}</div>

            <div className="admin-stat-note">{stat.note}</div>
          </article>
        ))}
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Platform Activity</h2>

              <p>Illustrative events for the admin dashboard.</p>
            </div>
          </div>

          <div className="admin-activity-list">
            {activities.map((activity) => (
              <article
                className="admin-activity-item"
                key={activity.title}
              >
                <span className="admin-activity-icon" aria-hidden="true">
                  {activity.icon}
                </span>

                <div className="admin-activity-copy">
                  <strong>{activity.title}</strong>
                  <p>{activity.detail}</p>
                </div>

                <span
                  className={`admin-status ${activity.statusClass}`.trim()}
                >
                  {activity.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Quick Actions</h2>

              <p>Navigate to platform management areas.</p>
            </div>
          </div>

          <div className="admin-quick-links">
            {quickLinks.map((item) => (
              <Link
                href={item.href}
                className="admin-quick-link"
                key={item.href}
              >
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <span className="admin-quick-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="admin-note">
            <strong>Prototype notice:</strong> All statistics and activity
            shown here are sample data. This dashboard is not yet connected to
            the backend and does not represent live platform records.
          </div>
        </section>
      </div>
    </main>
  );
}