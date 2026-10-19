import Link from "next/link";

const stats = [
  {
    label: "Assigned Cases",
    value: "24",
    note: "Total cases assigned",
  },
  {
    label: "Awaiting Action",
    value: "08",
    note: "Require attention",
  },
  {
    label: "In Progress",
    value: "11",
    note: "Currently being handled",
  },
  {
    label: "Resolved Cases",
    value: "05",
    note: "Marked as resolved",
  },
];

const cases = [
  {
    id: "PT-1042",
    title: "Injured dog rescue",
    location: "North Zone",
    priority: "Urgent",
    priorityClass: "",
  },
  {
    id: "PT-1038",
    title: "Stray kitten assistance",
    location: "Central Zone",
    priority: "High",
    priorityClass: "ngo-priority-high",
  },
  {
    id: "PT-1031",
    title: "Injured bird report",
    location: "South Zone",
    priority: "Medium",
    priorityClass: "ngo-priority-medium",
  },
];

const activities = [
  {
    title: "New rescue case assigned",
    description: "Case PT-1042 was assigned to your organization.",
    time: "Today · 10:30 AM",
  },
  {
    title: "Treatment progress updated",
    description: "A sample treatment update was recorded.",
    time: "Today · 9:15 AM",
  },
  {
    title: "Rescue completed",
    description: "Sample case PT-1027 was marked as resolved.",
    time: "Yesterday · 4:45 PM",
  },
];

export default function NgoOverviewPage() {
  return (
    <div className="ngo-dashboard">
      <section className="ngo-welcome">
        <h2>Welcome to your NGO workspace 👋</h2>
        <p>
          Manage rescue cases, coordinate animal care, and keep track
          of your organization&apos;s activities from one place.
        </p>
      </section>

      <section aria-label="Case statistics" className="ngo-stat-grid">
        {stats.map((stat) => (
          <article className="ngo-stat-card" key={stat.label}>
            <span className="ngo-stat-label">{stat.label}</span>
            <strong className="ngo-stat-value">{stat.value}</strong>
            <span className="ngo-stat-note">{stat.note}</span>
          </article>
        ))}
      </section>

      <section>
        <h2 className="ngo-section-title">Quick actions</h2>

        <div className="ngo-action-grid">
          <Link className="ngo-action-link" href="/ngo/cases">
            <strong>View rescue cases →</strong>
            <span>Review assigned cases and their current status.</span>
          </Link>

          <Link className="ngo-action-link" href="/ngo/animals">
            <strong>Manage animals →</strong>
            <span>View animal records and care information.</span>
          </Link>

          <Link className="ngo-action-link" href="/ngo/updates">
            <strong>Post case updates →</strong>
            <span>Prepare progress notes for rescue cases.</span>
          </Link>
        </div>
      </section>

      <div className="ngo-two-column">
        <section className="ngo-panel">
          <h3>Priority rescue cases</h3>

          <div className="ngo-case-list">
            {cases.map((item) => (
              <article className="ngo-case-item" key={item.id}>
                <div>
                  <h4>{item.title}</h4>
                  <p>
                    {item.id} · {item.location}
                  </p>
                </div>

                <span
                  className={`ngo-priority ${item.priorityClass}`}
                >
                  {item.priority}
                </span>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 22, marginBottom: 0 }}>
            <Link className="ngo-text-link" href="/ngo/cases">
              View all cases →
            </Link>
          </p>
        </section>

        <section className="ngo-panel">
          <h3>Recent activity</h3>

          <div className="ngo-activity-list">
            {activities.map((activity) => (
              <article
                className="ngo-activity-item"
                key={activity.title}
              >
                <div>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <p>{activity.time}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="ngo-demo-notice">
        <strong>Frontend prototype:</strong> all statistics, cases, and
        activities on this page are sample data. They are not live
        PawTrace records, and no backend updates are being made.
      </aside>
    </div>
  );
}