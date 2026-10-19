import "./admin.css";
import Link from "next/link";

const adminNavigation = [
  { label: "Overview", href: "/admin", icon: "▦" },
  { label: "NGO Management", href: "/admin/ngos", icon: "⌂" },
  { label: "User Management", href: "/admin/users", icon: "♙" },
  { label: "Reports", href: "/admin/reports", icon: "▤" },
  { label: "Case Management", href: "/admin/cases", icon: "♡" },
  { label: "Animal Management", href: "/admin/animals", icon: "🐾" },
  { label: "Settings", href: "/admin/settings", icon: "⚙" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-icon">🐾</span>

          <span>
            <strong>PawTrace</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </Link>

        <div className="admin-nav-heading">
          PLATFORM MANAGEMENT
        </div>

        <nav
          className="admin-navigation"
          aria-label="Admin navigation"
        >
          {adminNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="admin-nav-link"
            >
              <span className="admin-nav-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-demo-dot" />

          <span>
            <strong>Prototype Mode</strong>
            <small>Sample data only</small>
          </span>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-topbar-label">
              PAWTRACE PLATFORM
            </span>

            <strong>Administration</strong>
          </div>

          <Link href="/ngo" className="admin-switch-link">
            NGO Portal →
          </Link>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}